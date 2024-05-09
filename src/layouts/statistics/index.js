/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useReducer, useCallback, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import SelectYear from "layouts/statistics/selectYear";

import statService from "apis/services/statistics";


function reducer(state, action) {
  switch (action.type) {
    case "YEAR":
      return {
        ...state, 
        year: action.data,
      };
    case "MONTH": 
      return {
        ...state, 
        month: action.data,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const initialState = {
  month: {
    labels: [],
    datasets: { 
      label: "Desktop apps", 
      data: [] 
    },
  },
  year: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { 
      label: "Desktop apps", 
      data: [] 
    },
  }
}

function Statistics() {
  // const { sales, tasks } = reportsLineChartData;

  const [tasks, dispatch] = useReducer(reducer, initialState);

  const [year, setYear] = useState(2024);
    
  const fatchMonth = useCallback(
    async () => {
      try {
        const response = await statService.getStatisticThisMonth();
        dispatch({ type: 'MONTH', data: response });
      } catch (e) {
        throw new Error(`Unhandled action type: ${e.message}`);
      }
    },
    []
  );

  const fetchYear = useCallback(
    async (year) => {
      try {
        const response = await statService.getStatisticYear(year);
        dispatch({ type: 'YEAR', data: response });
      } catch (e) {
        throw new Error(`Unhandled action type: ${e.message}`);
      }
    },
    []
  );

  useEffect(() => {
    fetchYear(2024);
    fatchMonth();
  }, []);


  const handleChange = useCallback(
    (event) => {
      setYear(event.target.value);
      fetchYear(event.target.value);
    },
    []
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="당월 - 지출"
                  description="이달 사용금액"
                  date=""
                  chart={tasks.month}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={4.5}>
          <SelectYear year={year} onChange={handleChange} />
          {/* <FormControl sx={{minWidth: 180 }}>
            <InputLabel id="demo-select-small-label">년도</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-simple-select"
              value={year}
              label="년도"
              onChange={handleChange}
              sx={{fontSize: 20, p:1}}
            >
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
            </Select>
          </FormControl> */}
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="월별 - 지출"
                  description="해당 년도 월별 지출금액"
                  date=""
                  chart={tasks.year}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default React.memo(Statistics);
