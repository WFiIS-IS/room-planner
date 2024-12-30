import camelcaseKeys from 'camelcase-keys';
import { memo } from 'radashi';
import { z } from 'zod';

import type { StateObject } from '@/lib/home-assistant/api-types';
import {
  DeviceType,
  lightDeviceSchema,
  thermometerSensorSchema,
  timestampSensorSchema,
} from '@/lib/home-assistant/device-types';

import { stateIsLightObject, stateIsThermometerSensor, stateIsTimestampSensor } from './filters';

export class HAState {
  private readonly __unprocessedData: Array<StateObject>;

  constructor(data: Array<StateObject>) {
    this.__unprocessedData = data;
  }

  readonly getLights = memo(() => {
    const lightObjects = this.__unprocessedData.filter(stateIsLightObject);
    const camelCased = lightObjects.map((obj) => camelcaseKeys(obj, { deep: true }));
    const final = camelCased.map((obj) => ({ ...obj, type: DeviceType.LIGHT }));
    return z.array(lightDeviceSchema).parse(final);
  });

  readonly getTimestampSensors = memo(() => {
    const timestampSensors = this.__unprocessedData.filter(stateIsTimestampSensor);
    const camelCased = timestampSensors.map((obj) => camelcaseKeys(obj, { deep: true }));
    const final = camelCased.map((obj) => ({ ...obj, type: DeviceType.SENSOR_TIMESTAMP }));
    return z.array(timestampSensorSchema).parse(final);
  });

  readonly getThermometers = memo(() => {
    const thermometerSensors = this.__unprocessedData.filter(stateIsThermometerSensor);
    const camelCased = thermometerSensors.map((obj) => camelcaseKeys(obj, { deep: true }));
    const final = camelCased.map((obj) => ({ ...obj, type: DeviceType.SENSOR_THERMOMETER }));

    return z.array(thermometerSensorSchema).parse(final);
  });
}
