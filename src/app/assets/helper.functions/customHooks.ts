export const useDonutData = (data: any, title: "testing") => {
  const options = {
    colors: ["#3d80cb", "#6aa41e", "#5B0888", "#E55604", "#3D246C"],
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: "70%",
    },
    title: { text: undefined },
    tooltip: {},
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "Percentage",
        colorByPoint: true,
        innerSize: "60%",
        data: data,
      },
    ],
  };
  return options;
};
