
import { store } from '@graphprotocol/graph-ts'
import {
    BadgeTierSet as BadgeTierSetEvent,
    BadgeTierUpdated as BadgeTierUpdatedEvent,
    BadgeMinted as BadgeMintedEvent,
    BadgeMetadataSettled as BadgeMetadataSettledEvent,
    BadgeTierMetadataUpdated as BadgeTierMetadataUpdatedEvent,
} from "../generated/SuperChainBadges/SuperChainBadges"
import {
    BadgeTier, Badge, AccountBadge,
} from "../generated/schema"



export function handleBadgeTierSet(event: BadgeTierSetEvent): void {
    let entity = new BadgeTier(event.params.badgeId.toHexString().concat(event.params.tier.toString()))
    let badge = Badge.load(event.params.badgeId.toHexString())
    if (!badge) return
    entity.points = event.params.points
    entity.tier = event.params.tier
    entity.badge = badge.id
    entity.uri = event.params.uri
    entity.save()

}

export function handleBadgeMetadataSettled(event: BadgeMetadataSettledEvent): void {
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
    const accountBadgeId = event.params.user.concatI32(event.params.badgeId.toI32())
    let accountBadge = AccountBadge.load(accountBadgeId)
    if (!accountBadge) return
    accountBadge.tier = event.params.tier
    accountBadge.points = event.params.points
    accountBadge.save()
}

export function handleBadgeMinted(event: BadgeMintedEvent): void {
    let entity = new AccountBadge(event.params.user.concatI32(event.params.badgeId.toI32()))
    let badge = Badge.load(event.params.badgeId.toHexString())
    if (!badge) return
    entity.badge = badge.id
    entity.tier = event.params.initialTier
    entity.points = event.params.points
    entity.user = event.params.user
    entity.save()
}

export function handleBadgeTierMetadataUpdated(event: BadgeTierMetadataUpdatedEvent): void {
    let entity = BadgeTier.load(event.params.badgeId.toHexString().concat(event.params.tier.toString()))
    if (!entity) return
    entity.uri = event.params.newURI
    entity.save()
}
