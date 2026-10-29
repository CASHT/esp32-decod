export const decoder = {
  decoderName: "tms_ble",
  manufacturer: "ffff",

  advertisementDecode(data) {
    if (!data || data.length < 8) return null;

    if (
      data[0] !== 0xff ||
      data[1] !== 0xff ||
      data[2] !== 0x54 ||
      data[3] !== 0x4d ||
      data[4] !== 0x53
    ) return null;

    return {
      protocol_dimensionless: data[5],
      zone_dimensionless: data[6],
      txPower_dBm: data.readInt8(7)
    };
  }
};
