// TMS Cooperative Positioning - Sensor Logger custom BLE decoder V3
// Based on sensor-ble README and devices/ruuvi.js API.
// ESP32 advertisement manufacturer bytes:
// FF FF 54 4D 53 01 01 C5  (company id, TMS, version, zone, tx ref)
function decodeTmsBeacon(data) {
  if (!data || data.length < 8) return null;
  if (data[0] !== 0xff || data[1] !== 0xff) return null;
  if (data[2] !== 0x54 || data[3] !== 0x4d || data[4] !== 0x53) return null;
  if (data[5] !== 1) return null;
  var zone = data[6];
  if (zone < 1 || zone > 20) return null;
  var power = data[7] > 127 ? data[7] - 256 : data[7];
  return {
    zone_dimensionless: zone,
    version_dimensionless: 1,
    txPower_dBm: power
  };
}

export const decoder = {
  decoderName: "tms_ble_zone_v3",
  name: "TMS-BLE-",
  advertisementDecode: decodeTmsBeacon,
  units: "Zone number, protocol version and nominal TX reference power (dBm)."
};

export const tests = [
  {
    given: { manufacturerData: "ffff544d530101c5" },
    expected: {
      zone_dimensionless: 1,
      version_dimensionless: 1,
      txPower_dBm: -59
    }
  }
];
