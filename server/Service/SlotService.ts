import { GraphQLError } from "graphql";
import { database } from "../database.js";
import Slot from "../models/Slot.js";

export default class SlotService {
  private slotRepo = database.getRepository(Slot);
  async getSlot() {
    try {
      const slots = await this.slotRepo.find();
      return {
        success: true,
        message: "all slots",
        slots,
      };
    } catch (error) {
      throw new GraphQLError("Error while getting the slot");
    }
  }
}
