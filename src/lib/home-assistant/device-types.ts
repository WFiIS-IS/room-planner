import { z } from 'zod';

export enum DeviceType {
  LIGHT = 'light',
  SENSOR_TIMESTAMP = 'sensor.timestamp',
  SENSOR_THERMOMETER = 'sensor.thermometer',
}

export enum LightState {
  ON = 'on',
  OFF = 'off',
}

export const isLightEntityId = z.string().startsWith('light.');

export const lightDeviceSchema = z.object({
  entityId: isLightEntityId,
  type: z.literal(DeviceType.LIGHT),
  state: z.union([z.literal(LightState.ON), z.literal(LightState.OFF)]),
  lastChanged: z.coerce.date(),
  attributes: z.object({
    friendlyName: z.string().optional(),
  }),
});
export type LightDevice = z.infer<typeof lightDeviceSchema>;

export const timestampSensorSchema = z.object({
  entityId: z.string().startsWith('sensor.'),
  type: z.literal(DeviceType.SENSOR_TIMESTAMP),
  state: z.coerce.date(),
  lastChanged: z.coerce.date(),
  attributes: z.object({
    friendlyName: z.string(),
    deviceClass: z.literal('timestamp'),
  }),
});
export type TimestampSensor = z.infer<typeof timestampSensorSchema>;

export const thermometerSensorSchema = z.object({
  entityId: z.string().startsWith('sensor.'),
  type: z.literal(DeviceType.SENSOR_THERMOMETER),
  state: z.coerce.number(),
  lastChanged: z.coerce.date(),
  attributes: z.object({
    friendlyName: z.string(),
    deviceClass: z.literal('temperature'),
    unitOfMeasurement: z.string(),
  }),
});
export type ThermometerSensor = z.infer<typeof thermometerSensorSchema>;
