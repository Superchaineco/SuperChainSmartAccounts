import { BigInt, Bytes, crypto, log } from "@graphprotocol/graph-ts";
import {
  PerkAdded as PerkAddedEvent,
  PerkSet as PerkSetEvent,
  PerkRedeemed as PerkRedeemedEvent,
  PerkCompleted as PerkCompletedEvent,
} from "../generated/EcoAccountsPerks/EcoAccountsPerks";
import { Badge, BadgeTier, Perk, PerkRedemption, UserPerkClaim } from "../generated/schema";

function generatePerkId(badgeId: BigInt, tier: BigInt): Bytes {
  // Genera el mismo hash que el contrato: keccak256(abi.encodePacked(badgeId, tier))
  let encoded = Bytes.empty();
  encoded = encoded.concat(Bytes.fromHexString(badgeId.toHex().slice(2).padStart(64, "0")));
  encoded = encoded.concat(Bytes.fromHexString(tier.toHex().slice(2).padStart(64, "0")));
  return Bytes.fromByteArray(crypto.keccak256(encoded));
}

export function handlePerkAdded(event: PerkAddedEvent): void {
  let badgeId = event.params.badgeId.toHexString();
  let tierId = event.params.badgeId.toHexString().concat(event.params.tier.toString());
  let perkId = generatePerkId(event.params.badgeId, event.params.tier);
  
  // Buscar o crear la badge
  let badge = Badge.load(badgeId);
  if (badge == null) {
    badge = new Badge(badgeId);
    badge.badgeId = event.params.badgeId;
    badge.uri = ""; // Se establecerá cuando se procese el evento de badge
  }
  
  // Buscar o crear el BadgeTier
  let badgeTier = BadgeTier.load(tierId);
  if (badgeTier == null) {
    badgeTier = new BadgeTier(tierId);
    badgeTier.tier = event.params.tier;
    badgeTier.points = BigInt.fromI32(0); // Se establecerá cuando se procese el evento de badge tier
    badgeTier.uri = ""; // Se establecerá cuando se procese el evento de badge tier
    badgeTier.badge = badgeId;
  }
  
  // Crear el Perk
  let perk = new Perk(perkId.toHexString());
  perk.badgeId = event.params.badgeId;
  perk.tier = event.params.tier;
  perk.badge = badgeId;
  perk.badgeTier = tierId;
  perk.token = event.params.token;
  perk.amount = event.params.amount;
  perk.maxClaims = event.params.maxRedemptions;
  perk.totalClaims = BigInt.fromI32(0);
  perk.isCompleted = false;
  
  // Establecer la relación en BadgeTier
  badgeTier.perk = perk.id;
  
  badge.save();
  badgeTier.save();
  perk.save();
}

export function handlePerkSet(event: PerkSetEvent): void {
  let badgeId = event.params.badgeId.toHexString();
  let tierId = event.params.badgeId.toHexString().concat(event.params.tier.toString());
  let perkId = generatePerkId(event.params.badgeId, event.params.tier);
  
  let badge = Badge.load(badgeId);
  if (badge == null) {
    badge = new Badge(badgeId);
    badge.badgeId = event.params.badgeId;
    badge.uri = "";
  }
  
  let badgeTier = BadgeTier.load(tierId);
  if (badgeTier == null) {
    badgeTier = new BadgeTier(tierId);
    badgeTier.tier = event.params.tier;
    badgeTier.points = BigInt.fromI32(0);
    badgeTier.uri = "";
    badgeTier.badge = badgeId;
  }
  
  let perk = Perk.load(perkId.toHexString());
  if (perk == null) {
    perk = new Perk(perkId.toHexString());
    perk.badgeId = event.params.badgeId;
    perk.tier = event.params.tier;
    perk.badge = badgeId;
    perk.badgeTier = tierId;
    perk.totalClaims = BigInt.fromI32(0);
    perk.isCompleted = false;
  }
  
  perk.token = event.params.token;
  perk.amount = event.params.amount;
  perk.maxClaims = event.params.maxRedemptions;
  
  badgeTier.perk = perk.id;
  
  badge.save();
  badgeTier.save();
  perk.save();
}

export function handlePerkRedeemed(event: PerkRedeemedEvent): void {
  let redemptionId = event.transaction.hash.concatI32(event.logIndex.toI32());
  let redemption = new PerkRedemption(redemptionId);
  
  redemption.redeemer = event.params.redeemer;
  redemption.token = event.params.token;
  redemption.amount = event.params.amount;
  redemption.blockNumber = event.block.number;
  redemption.blockTimestamp = event.block.timestamp;
  redemption.transactionHash = event.transaction.hash;
  
  // Ahora podemos usar directamente el perkId del evento
  let perkId = event.params.perkId.toHexString();
  let perk = Perk.load(perkId);

  redemption.perk = perkId;
  
  if (perk != null) {
    
    // Establecer la relación
    
    // Incrementar totalClaims solo si maxClaims no es 0 (sin límite)
    if (perk.maxClaims.gt(BigInt.fromI32(0))) {
      perk.totalClaims = perk.totalClaims.plus(BigInt.fromI32(1));
    }
    
    perk.save();
  } else {
    log.debug("Perk with ID {} not found for redemption {}, with txHash {}", [perkId, redemptionId.toHexString(), event.transaction.hash.toHexString()]);
  }
  
  let userClaimId = event.params.redeemer.toHexString() + "-" + perkId;
  let userClaim = UserPerkClaim.load(userClaimId);
  
  if (userClaim == null) {
    userClaim = new UserPerkClaim(userClaimId);
    userClaim.user = event.params.redeemer;
    if (perk != null) {
      userClaim.perk = perkId;
    }
  }
  
  userClaim.isClaimed = true;
  userClaim.claimedAt = event.block.timestamp;
  userClaim.transactionHash = event.transaction.hash;
  
  redemption.save();
  userClaim.save();
}

export function handlePerkCompleted(event: PerkCompletedEvent): void {
  let perkId = generatePerkId(event.params.badgeId, event.params.tier);
  
  let perk = Perk.load(perkId.toHexString());
  if (perk != null) {
    perk.isCompleted = true;
    perk.save();
  }
}
