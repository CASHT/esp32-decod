// TMS Cooperative Positioning - Sensor Logger custom decoder V1
// Compatible with the TMS_BLE_01.ino manufacturer advertisement.
// BLE company ID 0xFFFF is reserved for development/testing only.
export const decoder = {
  decoderName: "tms_cooperative_positioning_v1",
  manufacturer: "ffff",
  advertisementDecode(manufacturerData) {
    if (!manufacturerData || manufacturerData.length < 8) return null;
    if (manufacturerData[0] !== 0xff || manufacturerData[1] !== 0xff) return null;
    if (manufacturerData[2] !== 0x54 || manufacturerData[3] !== 0x4d || manufacturerData[4] !== 0x53) return null;
    const version = manufacturerData[5];
    const zone = manufacturerData[6];
    const txRef = manufacturerData.readInt8(7);
    if (version !== 1 || zone < 1 || zone > 20) return null;
    return {
      zone_dimensionless: zone,
      protocol_dimensionless: version,
      txReference_dBm: txRef
    };
  },
  units: {
    zone_dimensionless: "dimensionless",
    protocol_dimensionless: "dimensionless",
    txReference_dBm: "dBm"
  }
};
