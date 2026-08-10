import { Resolver, Query } from "type-graphql";
import AdminDashboardService from "../Service/AdminDashboardService.js";
import { AdminDashboardResponse } from "../Response/AdminDashboardResponse.js";

@Resolver()
export default class AdminDashboardResolver {
  private adminDashboardService = new AdminDashboardService();

  @Query(() => AdminDashboardResponse)
  async adminDashboard() {
    return this.adminDashboardService.getDashboard();
  }
}
