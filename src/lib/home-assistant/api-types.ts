export type StateObject<TEntityId = string, TState = string, TAttributes = unknown> = {
  entity_id: TEntityId;
  state: TState;
  last_changed: string;
  attributes: TAttributes;
};

type GenericAttributes = {
  friendly_name: string;
};
export type LightStateObject = StateObject<`light.${string}`, 'on' | 'off', GenericAttributes>;

export type TimestampSensorStateObject = StateObject<
  `sensor.${string}`,
  string,
  GenericAttributes & { device_class: 'timestamp' }
>;

type ThermometerAttributes = GenericAttributes & {
  device_class: 'temperature';
  unit_of_measurement: string;
  state_class: 'measurement';
};
export type ThermometerSensorStateObject = StateObject<
  `sensor.${string}`,
  string,
  ThermometerAttributes
>;
