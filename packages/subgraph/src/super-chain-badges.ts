import {store, BigInt} from "@graphprotocol/graph-ts";
import {
  BadgeTierSet as BadgeTierSetEvent,
  BadgeTierUpdated as BadgeTierUpdatedEvent,
  BadgeMinted as BadgeMintedEvent,
  BadgeMetadataSettled as BadgeMetadataSettledEvent,
  BadgeTierMetadataUpdated as BadgeTierMetadataUpdatedEvent,
  BadgeTierRemoved as BadgeTierRemovedEvent,
  BadgeMetadataUpdated as BadgeMetadataUpdatedEvent,
} from "../generated/SuperChainBadges/SuperChainBadges";
import {
  BadgeTier,
  Badge,
  AccountBadge,
  SuperChainSmartAccount,
} from "../generated/schema";

export function handleBadgeTierSet(event: BadgeTierSetEvent): void {
  let entity = new BadgeTier(
    event.params.badgeId.toHexString().concat(event.params.tier.toString()),
  );
  let badge = Badge.load(event.params.badgeId.toHexString());
  if (!badge) return;
  entity.points = event.params.points;
  entity.tier = event.params.tier;
  entity.badge = badge.id;
  entity.uri = event.params.uri;
  entity.save();
}

export function handleBadgeMetadataSettled(
  event: BadgeMetadataSettledEvent,
): void {
  let badgeId = event.params.badgeId.toHexString();

  if (event.params.generalURI == "") {
    // Remove the entity if it exists
    store.remove("Badge", badgeId);
  } else {
    // Otherwise, create or update the entity
    let entity = new Badge(badgeId);
    entity.badgeId = event.params.badgeId;
    entity.uri = event.params.generalURI;
    entity.save();
  }
}

export function handleBadgeTierUpdated(event: BadgeTierUpdatedEvent): void {
  const accountBadgeId = event.params.user.concatI32(
    event.params.badgeId.toI32(),
  );
  let accountBadge = AccountBadge.load(accountBadgeId);
  if (!accountBadge) return;
  accountBadge.tier = event.params.tier;
  accountBadge.points = event.params.points;
  accountBadge.save();
}

export function handleBadgeMinted(event: BadgeMintedEvent): void {
  let accountBadgeId = event.params.user.concatI32(
    event.params.badgeId.toI32(),
  );
  let entity = AccountBadge.load(accountBadgeId);
  if (entity == null) {
    entity = new AccountBadge(accountBadgeId);
  }
  let badge = Badge.load(event.params.badgeId.toHexString());
  if (!badge) return;

  // Buscar o crear SuperChainSmartAccount
  let superChainAccount = SuperChainSmartAccount.load(event.params.user);
  if (superChainAccount == null) {
    // Si no existe, crear una cuenta básica
    superChainAccount = new SuperChainSmartAccount(event.params.user);
    superChainAccount.safe = event.params.user;
    superChainAccount.initialOwner = event.params.user; // Asumimos que es el owner inicial
    superChainAccount.superChainId = "0"; // ID por defecto
    superChainAccount.level = BigInt.fromI32(0);
    superChainAccount.points = BigInt.fromI32(0);
    // Valores por defecto para noun
    superChainAccount.noun_background = BigInt.fromI32(0);
    superChainAccount.noun_body = BigInt.fromI32(0);
    superChainAccount.noun_accessory = BigInt.fromI32(0);
    superChainAccount.noun_head = BigInt.fromI32(0);
    superChainAccount.noun_glasses = BigInt.fromI32(0);
    superChainAccount.blockNumber = event.block.number;
    superChainAccount.blockTimestamp = event.block.timestamp;
    superChainAccount.transactionHash = event.transaction.hash;
    superChainAccount.save();
  }

  entity.badge = badge.id;
  entity.tier = event.params.initialTier;
  entity.points = event.params.points;
  entity.user = superChainAccount.id; // Referencia correcta a SuperChainSmartAccount
  entity.save();
}

export function handleBadgeTierMetadataUpdated(
  event: BadgeTierMetadataUpdatedEvent,
): void {
  let entity = BadgeTier.load(
    event.params.badgeId.toHexString().concat(event.params.tier.toString()),
  );
  if (!entity) return;
  entity.uri = event.params.newURI;
  entity.save();
}

export function handleBadgeMetadataUpdated(
  event: BadgeMetadataUpdatedEvent,
): void {
  let entity = Badge.load(event.params.badgeId.toHexString());
  if (!entity) return;
  entity.uri = event.params.generalURI;
  entity.save();
}
export function handleBadgeTierRemoved(event: BadgeTierRemovedEvent): void {
  const tierEntityId = event.params.badgeId
    .toHexString()
    .concat(event.params.tier.toString());
  store.remove("BadgeTier", tierEntityId);
}
