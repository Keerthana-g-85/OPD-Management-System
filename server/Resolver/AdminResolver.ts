import { Resolver, Query, Authorized } from "type-graphql";
import AdminDashboardService from "../Service/AdminDashboardService.js";
import { AdminDashboardResponse } from "../Response/AdminDashboardResponse.js";
import { Role } from "../models/Users.js";

@Resolver()
export default class AdminDashboardResolver {
  private adminDashboardService = new AdminDashboardService();

  @Authorized(Role.admin)
  @Query(() => AdminDashboardResponse)
  async adminDashboard() {
    return this.adminDashboardService.getDashboard();
  }
}
