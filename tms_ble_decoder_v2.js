// TMS BLE beacon decoder for Sensor Logger
// ESP32 payload: FF FF 54 4D 53 01 <zone> <txReference>
export const decoder = {
  decoderName: "tms_ble_zone_v2",
  manufacturer: "ffff",
  advertisementDecode: function (data) {
    if (!data || data.length < 8) return null;
    if (data[0] !== 255 || data[1] !== 255) return null;
    if (data[2] !== 84 || data[3] !== 77 || data[4] !== 83) return null;
    if (data[5] !== 1) return null;
    const zone = data[6];
    if (zone < 1 || zone > 20) return null;
    const tx = data[7] > 127 ? data[7] - 256 : data[7];
    return {
      zone_dimensionless: zone,
      protocol_dimensionless: 1,
      txReference_dBm: tx
    };
  },
  units: {
    zone_dimensionless: "dimensionless",
    protocol_dimensionless: "dimensionless",
    txReference_dBm: "dBm"
  }
};
