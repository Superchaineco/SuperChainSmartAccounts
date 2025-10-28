import {BigInt, ByteArray, Bytes, crypto, log} from "@graphprotocol/graph-ts";
import {
  PerkAdded as PerkAddedEvent,
  PerkSet as PerkSetEvent,
  PerkRedeemed as PerkRedeemedEvent,
  PerkCompleted as PerkCompletedEvent,
} from "../generated/EcoAccountsPerks/EcoAccountsPerks";
import {
  Badge,
  BadgeTier,
  Perk,
  PerkRedemption,
  UserPerkClaim,
} from "../generated/schema";

function generatePerkId(badgeId: BigInt, tier: BigInt): Bytes {
  // Replicar exactamente: keccak256(abi.encodePacked(badgeId, tier))
  
  // En Solidity, abi.encodePacked con uint256 concatena los 32 bytes de cada valor
  let badgeIdBytes = new ByteArray(32);
  let tierBytes = new ByteArray(32);
  
  // Convertir BigInt a bytes de 32 bytes (big-endian)
  let badgeIdHex = badgeId.toHex().slice(2); // Quitar '0x'
  let tierHex = tier.toHex().slice(2); // Quitar '0x'
  
  // Pad a 64 caracteres (32 bytes)
  while (badgeIdHex.length < 64) {
    badgeIdHex = "0" + badgeIdHex;
  }
  while (tierHex.length < 64) {
    tierHex = "0" + tierHex;
  }
  
  // Convertir hex string a bytes
  for (let i = 0; i < 32; i++) {
    let hexByte = badgeIdHex.substr(i * 2, 2);
    badgeIdBytes[i] = parseInt(hexByte, 16) as u8;
  }
  
  for (let i = 0; i < 32; i++) {
    let hexByte = tierHex.substr(i * 2, 2);
    tierBytes[i] = parseInt(hexByte, 16) as u8;
  }
  
  // Concatenar badgeId + tier (64 bytes total)
  let concatenated = new ByteArray(64);
  for (let i = 0; i < 32; i++) {
    concatenated[i] = badgeIdBytes[i];
    concatenated[i + 32] = tierBytes[i];
  }
  
  // Hacer keccak256 del resultado concatenado
  return Bytes.fromByteArray(crypto.keccak256(concatenated));
}

// Función helper para debugging: buscar perks similares
function debugPerkSearch(targetPerkId: Bytes): void {
  log.warning("🔍 Debugging perk search for: {}", [targetPerkId.toHexString()]);
  
  // Intentemos generar algunos perkIds comunes para comparar
  for (let badgeId = 1; badgeId <= 5; badgeId++) {
    for (let tier = 0; tier <= 3; tier++) {
      let testPerkId = generatePerkId(BigInt.fromI32(badgeId), BigInt.fromI32(tier));
      let testPerk = Perk.load(testPerkId);
      if (testPerk != null) {
        log.warning("✅ Found perk: badgeId={}, tier={}, perkId={}", [
          badgeId.toString(),
          tier.toString(),
          testPerkId.toHexString()
        ]);
      }
    }
  }
}

export function handlePerkAdded(event: PerkAddedEvent): void {
  let badgeId = event.params.badgeId.toHexString();
  let tierId = event.params.badgeId
    .toHexString()
    .concat(event.params.tier.toString());
  let perkId = generatePerkId(event.params.badgeId, event.params.tier);
  
  // Logging temporal para debugging
  log.warning("PerkAdded: badgeId={}, tier={}, generatedPerkId={}", [
    event.params.badgeId.toString(),
    event.params.tier.toString(),
    perkId.toHexString()
  ]);

  // Buscar o crear la badge
  let badge = Badge.load(badgeId);
  if (badge == null) {
    badge = new Badge(badgeId);
    badge.badgeId = event.params.badgeId;
    badge.uri = ""; // Se establecerá cuando se procese el evento de badge
  }

  // Crear el Perk
  let perk = new Perk(perkId);
  perk.badgeId = event.params.badgeId;
  perk.tier = event.params.tier;
  perk.badge = badgeId;
  perk.token = event.params.token;
  perk.amount = event.params.amount;
  perk.maxClaims = event.params.maxRedemptions;
  perk.totalClaims = BigInt.fromI32(0);
  perk.isCompleted = false;

  // Caso especial: tier = 0 no tiene BadgeTier asociado
  if (event.params.tier.equals(BigInt.fromI32(0))) {
    // Para tier 0, la perk se asocia directamente a la badge sin BadgeTier
    // El campo badgeTier queda sin asignar (null en el schema)
  } else {
    // Para tier > 0, crear/buscar el BadgeTier normalmente
    let badgeTier = BadgeTier.load(tierId);
    if (badgeTier == null) {
      badgeTier = new BadgeTier(tierId);
      badgeTier.tier = event.params.tier;
      badgeTier.points = BigInt.fromI32(0);
      badgeTier.uri = "";
      badgeTier.badge = badgeId;
    }
    
    perk.badgeTier = tierId;
    badgeTier.perk = perk.id;
    badgeTier.save();
  }

  badge.save();
  perk.save();
}

export function handlePerkSet(event: PerkSetEvent): void {
  let badgeId = event.params.badgeId.toHexString();
  let tierId = event.params.badgeId
    .toHexString()
    .concat(event.params.tier.toString());
  let perkId = generatePerkId(event.params.badgeId, event.params.tier);
  
  // Logging temporal para debugging
  log.warning("PerkSet: badgeId={}, tier={}, generatedPerkId={}", [
    event.params.badgeId.toString(),
    event.params.tier.toString(),
    perkId.toHexString()
  ]);

  let badge = Badge.load(badgeId);
  if (badge == null) {
    badge = new Badge(badgeId);
    badge.badgeId = event.params.badgeId;
    badge.uri = "";
  }

  let perk = Perk.load(perkId);
  if (perk == null) {
    perk = new Perk(perkId);
    perk.badgeId = event.params.badgeId;
    perk.tier = event.params.tier;
    perk.badge = badgeId;
    perk.totalClaims = BigInt.fromI32(0);
    perk.isCompleted = false;
  }

  perk.token = event.params.token;
  perk.amount = event.params.amount;
  perk.maxClaims = event.params.maxRedemptions;

  // Caso especial: tier = 0 no tiene BadgeTier asociado
  if (event.params.tier.equals(BigInt.fromI32(0))) {
    // Para tier 0, la perk se asocia directamente a la badge sin BadgeTier
    // El campo badgeTier queda sin asignar (null en el schema)
  } else {
    // Para tier > 0, crear/buscar el BadgeTier normalmente
    let badgeTier = BadgeTier.load(tierId);
    if (badgeTier == null) {
      badgeTier = new BadgeTier(tierId);
      badgeTier.tier = event.params.tier;
      badgeTier.points = BigInt.fromI32(0);
      badgeTier.uri = "";
      badgeTier.badge = badgeId;
    }
    
    perk.badgeTier = tierId;
    badgeTier.perk = perk.id;
    badgeTier.save();
  }

  badge.save();
  perk.save();
}

export function handlePerkRedeemed(event: PerkRedeemedEvent): void {
  let redemptionId = event.transaction.hash.concatI32(event.logIndex.toI32());

  // Usar directamente el perkId del evento
  let perkId = event.params.perkId;
  let perk = Perk.load(perkId);

  // Logging temporal para debugging
  log.warning("PerkRedeemed: perkId={}, redeemer={}, token={}, amount={}", [
    perkId.toHexString(),
    event.params.redeemer.toHexString(),
    event.params.token.toHexString(),
    event.params.amount.toString()
  ]);

  // El perk debe existir antes de procesar la redención
  if (perk == null) {
    log.error("❌ PERK NULL! PerkId: {}, Block: {}, Transaction: {}", [
      perkId.toHexString(),
      event.block.number.toString(),
      event.transaction.hash.toHexString()
    ]);
    
    // Debugging: buscar perks existentes
    debugPerkSearch(perkId);
    return;
  }

  let redemption = new PerkRedemption(redemptionId);
  redemption.redeemer = event.params.redeemer;
  redemption.token = event.params.token;
  redemption.amount = event.params.amount;
  redemption.blockNumber = event.block.number;
  redemption.blockTimestamp = event.block.timestamp;
  redemption.transactionHash = event.transaction.hash;
  redemption.perk = perkId;

  // Incrementar totalClaims siempre que se redime un perk
  perk.totalClaims = perk.totalClaims.plus(BigInt.fromI32(1));

  // Marcar como completado si se alcanzó el máximo de claims (si hay límite)
  if (perk.maxClaims.gt(BigInt.fromI32(0)) && perk.totalClaims.ge(perk.maxClaims)) {
    perk.isCompleted = true;
  }

  perk.save();

  let userClaimId = event.params.redeemer.toHexString() + "-" + perkId.toHexString();
  let userClaim = UserPerkClaim.load(userClaimId);

  if (userClaim == null) {
    userClaim = new UserPerkClaim(userClaimId);
    userClaim.user = event.params.redeemer;
    userClaim.perk = perkId;
  }

  userClaim.isClaimed = true;
  userClaim.claimedAt = event.block.timestamp;
  userClaim.transactionHash = event.transaction.hash;

  redemption.save();
  userClaim.save();
}

export function handlePerkCompleted(event: PerkCompletedEvent): void {
  let perkId = generatePerkId(event.params.badgeId, event.params.tier);

  let perk = Perk.load(perkId);
  if (perk != null) {
    perk.isCompleted = true;
    perk.save();
  }
}
