import { Query, Resolver } from "type-graphql";
import SlotService from "../Service/SlotService.js";
import SlotResponse from "../Response/SlotResponse.js";

const slotService = new SlotService();
@Resolver()
export default class SlotResolver {
  @Query(()=>SlotResponse)
  getSlot() {
    return slotService.getSlot();
  }
}
