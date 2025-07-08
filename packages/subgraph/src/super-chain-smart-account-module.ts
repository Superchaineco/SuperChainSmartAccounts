import {
  EIP712DomainChanged as EIP712DomainChangedEvent,
  OwnerAdded as OwnerAddedEvent,
  OwnerPopulated as OwnerPopulatedEvent,
  OwnerPopulationRemoved as OwnerPopulationRemovedEvent,
  PointsIncremented as PointsIncrementedEvent,
  SuperChainSmartAccountCreated as SuperChainSmartAccountCreatedEvent,
  TierTresholdAdded as TierTresholdAddedEvent,
  TierTresholdUpdated as TierTresholdUpdatedEvent,
  NounUpdated as NounUpdatedEvent,
} from "../generated/SuperChainSmartAccountModule/SuperChainSmartAccountModule";
import {
  EIP712DomainChanged,
  OwnerAdded,
  OwnerPopulated,
  PointsIncremented,
  OwnerPopulationRemoved,
  SuperChainSmartAccount,
  LevelClaim,
  TierTresholds,
  Meta,
} from "../generated/schema";
import {BigInt, store} from "@graphprotocol/graph-ts";

const TIER_TRESHOLDS = "TierTresholds";

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent,
): void {
  let entity = new EIP712DomainChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTierTresholdAdded(event: TierTresholdAddedEvent): void {
  let entity = TierTresholds.load(TIER_TRESHOLDS);
  if (entity == null) {
    entity = new TierTresholds(TIER_TRESHOLDS);
    entity.tresholds = [];
  }
  let prevTreshold = entity.tresholds;
  prevTreshold.push(event.params.treshold);
  entity.tresholds = prevTreshold;
  entity.save();
}

export function handleTierTresholdUpdated(
  event: TierTresholdUpdatedEvent,
): void {
  let entity = TierTresholds.load(TIER_TRESHOLDS);
  if (entity == null) {
    entity = new TierTresholds(TIER_TRESHOLDS);
    entity.tresholds = [];
  }
  let prevTreshold = entity.tresholds;
  prevTreshold[event.params.index.toI32()] = event.params.newThreshold;
  entity.tresholds = prevTreshold;
  entity.save();
}

export function handleOwnerAdded(event: OwnerAddedEvent): void {
  let entity = new OwnerAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.safe = event.params.safe;
  entity.newOwner = event.params.newOwner;
  entity.superChainId = event.params.superChainId.toString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  let superChainSmartAccount = SuperChainSmartAccount.load(entity.safe);
  if (superChainSmartAccount == null) {
    superChainSmartAccount = new SuperChainSmartAccount(entity.safe);
  }
  entity.superChainSmartAccount = superChainSmartAccount.id;
  entity.save();
  let entityId = event.params.safe.concat(event.params.newOwner);
  let populatedEntity = OwnerPopulated.load(entityId);
  if (populatedEntity != null) {
    store.remove("OwnerPopulated", entityId.toHexString());
  }
}

export function handleOwnerPopulated(event: OwnerPopulatedEvent): void {
  let entityId = event.params.safe.concat(event.params.newOwner);
  let entity = new OwnerPopulated(entityId);
  let meta = Meta.load("OwnerPopulated");
  if (meta == null) {
    meta = new Meta("OwnerPopulated");
    meta.count = BigInt.fromI32(0);
  }
  meta.count = meta.count.plus(BigInt.fromI32(1));
  meta.save();
  entity.safe = event.params.safe;
  entity.newOwner = event.params.newOwner;
  entity.superChainId = event.params.superChainId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  let superChainSmartAccount = SuperChainSmartAccount.load(entity.safe);
  if (superChainSmartAccount == null) {
    superChainSmartAccount = new SuperChainSmartAccount(entity.safe);
  }
  entity.superChainSmartAccount = superChainSmartAccount.id;
  entity.save();
}

export function handleOwnerPopulationRemoved(
  event: OwnerPopulationRemovedEvent,
): void {
  let entity = new OwnerPopulationRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  let meta = Meta.load("OwnerPopulated");
  if (meta == null) {
    meta = new Meta("OwnerPopulated");
    meta.count = BigInt.fromI32(0);
  }
  meta.count = meta.count.minus(BigInt.fromI32(1));
  meta.save();

  entity.safe = event.params.safe;
  entity.owner = event.params.owner;
  entity.superChainId = event.params.superChainId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  let superChainSmartAccount = SuperChainSmartAccount.load(entity.safe);
  if (superChainSmartAccount == null) {
    superChainSmartAccount = new SuperChainSmartAccount(entity.safe);
  }
  entity.superChainSmartAccount = superChainSmartAccount.id;
  entity.save();
  let entityId = event.params.safe.concat(event.params.owner);
  let populatedEntity = OwnerPopulated.load(entityId);
  if (populatedEntity != null) {
    store.remove("OwnerPopulated", entityId.toHexString());
  }
}

export function handlePointsIncremented(event: PointsIncrementedEvent): void {
  let entity = new PointsIncremented(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.recipient = event.params.recipient;
  entity.points = event.params.points;
  entity.levelUp = event.params.levelUp;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  let superChainSmartAccount = SuperChainSmartAccount.load(entity.recipient);
  if (superChainSmartAccount == null) {
    superChainSmartAccount = new SuperChainSmartAccount(entity.recipient);
    superChainSmartAccount.level = BigInt.fromI32(0);
    superChainSmartAccount.safe = entity.recipient;
    superChainSmartAccount.points = BigInt.fromI32(0);
  }

  superChainSmartAccount.points = superChainSmartAccount.points.plus(
    entity.points,
  );
  let thresholdsEntity = TierTresholds.load(TIER_TRESHOLDS);
  if (thresholdsEntity && event.params.levelUp) {
    let thresholds = thresholdsEntity.tresholds;
    let currentPoints = superChainSmartAccount.points;
    let newLevel = BigInt.fromI32(0);
    superChainSmartAccount.level = newLevel;

    for (let i = 0; i < thresholds.length; i++) {
      if (currentPoints >= thresholds[i]) {
        newLevel = BigInt.fromI32(i + 1);
        let levelClaimId = event.params.recipient.concatI32(newLevel.toI32());
        let levelClaim = LevelClaim.load(levelClaimId);

        if (levelClaim == null) {
          levelClaim = new LevelClaim(levelClaimId);
          levelClaim.account = superChainSmartAccount.id;
          levelClaim.level = newLevel;
          levelClaim.timestamp = event.block.timestamp;
          levelClaim.save();
        }
      } else {
        break;
      }
    }
    superChainSmartAccount.level = newLevel;
  }
  superChainSmartAccount.save();
  entity.superChainSmartAccount = superChainSmartAccount.id;
  entity.save();
}

export function handleSuperChainSmartAccountCreated(
  event: SuperChainSmartAccountCreatedEvent,
): void {
  let entity = new SuperChainSmartAccount(event.params.safe);
  entity.safe = event.params.safe;
  entity.initialOwner = event.params.initialOwner;
  entity.superChainId = event.params.superChainId;
  entity.noun_background = event.params.noun.background;
  entity.noun_body = event.params.noun.body;
  entity.noun_accessory = event.params.noun.accessory;
  entity.noun_head = event.params.noun.head;
  entity.noun_glasses = event.params.noun.glasses;
  entity.points = BigInt.fromI32(0);
  entity.level = BigInt.fromI32(0);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNounUpdated(event: NounUpdatedEvent): void {
  let entity = SuperChainSmartAccount.load(event.params.safe);
  if (entity != null) {
    entity.noun_background = event.params.noun.background;
    entity.noun_body = event.params.noun.body;
    entity.noun_accessory = event.params.noun.accessory;
    entity.noun_head = event.params.noun.head;
    entity.noun_glasses = event.params.noun.glasses;
    entity.save();
  }
}
