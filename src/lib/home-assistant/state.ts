import 'server-only';

import camelcaseKeys from 'camelcase-keys';
import { z } from 'zod';

import type { StateObject } from '@/lib/home-assistant/api-types';
import {
  DeviceType,
  lightDeviceSchema,
  thermometerSensorSchema,
  timestampSensorSchema,
} from '@/lib/home-assistant/device-types';

import {
  stateIsLightObject,
  stateIsThermometerSensor,
  stateIsTimestampSensor,
} from './_internal/filters';

export function checkState<T>(state: StateObject | null, filterFn: (states: StateObject[]) => T[]) {
  try {
    const result = filterFn(state ? [state] : []);
    if (result.length) {
      return result[0];
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

export function filterLights(states: StateObject[]) {
  const lightObjects = states.filter(stateIsLightObject);
  const camelCased = lightObjects.map((obj) => camelcaseKeys(obj, { deep: true }));
  const final = camelCased.map((obj) => ({ ...obj, type: DeviceType.LIGHT }));
  return z.array(lightDeviceSchema).parse(final);
}

export function filterTimestampSensors(states: StateObject[]) {
  const timestampSensors = states.filter(stateIsTimestampSensor);
  const camelCased = timestampSensors.map((obj) => camelcaseKeys(obj, { deep: true }));
  const final = camelCased.map((obj) => ({ ...obj, type: DeviceType.SENSOR_TIMESTAMP }));
  return z.array(timestampSensorSchema).parse(final);
}

export function filterThermometers(states: StateObject[]) {
  const thermometerSensors = states.filter(stateIsThermometerSensor);
  const camelCased = thermometerSensors.map((obj) => camelcaseKeys(obj, { deep: true }));
  const final = camelCased.map((obj) => ({ ...obj, type: DeviceType.SENSOR_THERMOMETER }));

  return z.array(thermometerSensorSchema).parse(final);
}
