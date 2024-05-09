import apiService from "../api";

const API_URL = "/api/auth/";

const statService = {
  async getStatisticThisMonth() {
    return {
      labels: ["1일", "2일"],
      datasets: { 
        label: "Desktop apps", 
        data: [200, 231] 
      },
    }
  },
  async getStatisticYear(year) {
    return {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: { label: "Desktop apps", data: year === 2024 ? [50, 40, 300, 220, 500,] : [50, 40, 300, 220, 500, 250, 400, 230, 500] },
    }
  },
};

export default statService;
