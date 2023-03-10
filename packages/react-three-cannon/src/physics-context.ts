import type {
  CannonWorkerAPI,
  CollideBeginEvent,
  CollideEndEvent,
  CollideEvent,
  RayhitEvent,
  Refs,
  Subscriptions,
} from '@pmndrs/cannon-worker-api'
import { createContext, useContext } from 'react'
import type { Vector3 } from 'three'

export type CollideEventWithData = CollideEvent & {
  data: {
    bi: string
    bj: string
    body: string
    target: string
  }
}
export type CollideBeginEventWithData = CollideBeginEvent & {
  data: {
    body: string
    target: string
  }
}
export type CollideEndEventWithData = CollideEndEvent & {
  data: {
    body: string
    target: string
  }
}

type CannonEvent = CollideBeginEventWithData | CollideEndEventWithData | CollideEventWithData | RayhitEvent
type CallbackByType<T extends { type: string }> = {
  [K in T['type']]?: T extends { type: K } ? (e: T) => void : never
}

export type CannonEvents = { [uuid: string]: Partial<CallbackByType<CannonEvent>> }

export type ScaleOverrides = { [uuid: string]: Vector3 }

export type PhysicsContext = {
  bodies: { [uuid: string]: number }
  events: CannonEvents
  refs: Refs
  scaleOverrides: ScaleOverrides
  subscriptions: Subscriptions
  worker: CannonWorkerAPI
}

export const physicsContext = createContext<PhysicsContext | null>(null)

export const usePhysicsContext = () => {
  const context = useContext(physicsContext)
  if (!context)
    throw new Error(
      'Physics context not found. @react-three/cannon & components can only be used within a Physics provider',
    )
  return context
}
