import { EventEmitter } from "events";
import express from "express";

const app = express();

const getEventEmitter = (): EventEmitter => {
  let currentEmitter = app.get("eventEmitter");

  if (!currentEmitter) {
    currentEmitter = new EventEmitter();
    app.set("eventEmitter", currentEmitter);
  }

  return currentEmitter;
};

export default getEventEmitter;
