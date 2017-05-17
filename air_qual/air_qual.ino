#include "MQ135.h"
#include <TheThingsNetwork.h>

const char *appEui = "70B3D57EF0004D7E";
const char *appKey = "597C18685E3C3039ECA70E4660E95DA3";

TheThingsNetwork ttn(Serial1, Serial, TTN_FP_EU868);

void setup (){
  Serial1.begin(57600); //speed at which you communicate over the serial line. 57600 symbols (bits in this case) per second. 
  Serial.begin (9600);

  while (!Serial && millis() < 10000); //while your uptime is less than 10 sec or your serial port is not connected it waits. Will timeout after 10 seconds.

  ttn.join(appEui, appKey);
}
void loop() {
  byte payload[2];
  MQ135 gasSensor = MQ135(A0); // Attach sensor to pin A0
  float rzero = gasSensor.getRZero();
  uint16_t air_quality = gasSensor.getPPM();
  payload[0] = air_quality >> 8; // e.g. bitshift by 2 to the right w/ 4 bits is 1010 as original to 0010
  payload[1] = air_quality;
  ttn.sendBytes(payload, sizeof(payload));
  Serial.print("rzero: ");
  Serial.print(rzero);
  Serial.print(" air_quality ");
  Serial.println(air_quality);
  delay(10000);
}
