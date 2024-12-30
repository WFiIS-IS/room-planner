import { z } from 'zod';

import type {
  LightStateObject,
  StateObject,
  ThermometerSensorStateObject,
  TimestampSensorStateObject,
} from '@/lib/home-assistant/api-types';

const _checkStateIsLightObject = z.object({
  entity_id: z.string().startsWith('light.'),
});

export function stateIsLightObject(obj: StateObject): obj is LightStateObject {
  return _checkStateIsLightObject.safeParse(obj).success;
}

const _checkStateIsTimestampSensor = z.object({
  entity_id: z.string().startsWith('sensor.'),
  attributes: z.object({
    device_class: z.literal('timestamp'),
  }),
});

export function stateIsTimestampSensor(obj: StateObject): obj is TimestampSensorStateObject {
  return _checkStateIsTimestampSensor.safeParse(obj).success;
}

const _checkStateIsThermometerSensor = z.object({
  entity_id: z.string().startsWith('sensor.'),
  attributes: z.object({
    device_class: z.literal('temperature'),
    unit_of_measurement: z.string(),
    state_class: z.string(),
  }),
});

export function stateIsThermometerSensor(obj: StateObject): obj is ThermometerSensorStateObject {
  return _checkStateIsThermometerSensor.safeParse(obj).success;
}
