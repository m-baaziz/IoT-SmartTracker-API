# IoT-SmartTracker-API
IoT University Project : Smart Tracker (API)

## Overview

SmartTracker is an IoT university project which goal is to track a precious object when it is moving away from its owner.

The system is composed of :
- RPI unit : Raspbery Pi + Wifi module + Bluetooth module + Accelerometer
- Mobile Gateway (Android)
- API

## Mobile Gateway <-> RPI unit

The RPI unit stays attached to the owner's precious object.
The Mobile Gateway (Android smartphone) represents the owner, and communicates with RPI unit through bluetooth. When the smartphone and the RPI unit are in Bluetooth range, they maintain a bluetooth connection by periodically sending pings, and acknowlegments.
Once the bluetooth connection is broken, we consider that the owner left the device. 

## RPI unit <-> RPI unit

If the RPI unit detects a movement (Accelerometer) while the owner is away, it starts to broadcast alert messages through wifi.
Every RPI units are listening on the same wifi ad-hoc network (same channel). If another RPI unit receives an alert message, it will try to send it to its mobile gateway through bluetooth (the bluetooth connection is not broken). If its owner is away, it will re-broadcast once the same message over wifi.

## RPI unit -> Mobile Gateway

A Mobile Gateway works as a proxy. When it receives an alert message from its RPI unit through bluetooth, it relays it to the remote Rest API.

## Mobile Gateway <-> API

An alert message is composed of the ip address of the stolen object's RPI unit, and a wifi accesspoints scan result (SSIDs and RSSIs).
When the remote API receives an alert message, it uses the Google Localization API to get an approximated position of the stolen object, and send it the owner's smartphone (real time websocket).
