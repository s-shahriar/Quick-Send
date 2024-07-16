import PieChart, {
  Connector,
  Export,
  Font,
  Label,
  Legend,
  Series,
  Tooltip,
} from 'devextreme-react/pie-chart';
import React from 'react';

function customizeText(arg) {
  return `${arg.argumentText} ${arg.percentText}`;
}

function customizeTooltip(arg) {
  return {
    text: `${arg.argumentText}: ${arg.percentText}`,
  };
}

const PieChartRender = ({ data }) => {
  const processRequestData = (requestsData) => {
    const itemCounts = requestsData.reduce(
      (acc, item) => {
        if (item.assetType.toLowerCase() === 'returnable') {
          acc.returnable += 1;
        } else if (item.assetType.toLowerCase() === 'non-returnable') {
          acc.nonReturnable += 1;
        }
        return acc;
      },
      { returnable: 0, nonReturnable: 0 }
    );

    const total = itemCounts.returnable + itemCounts.nonReturnable;
    const returnablePercentage = total > 0 ? ((itemCounts.returnable / total) * 100).toFixed(2) : 0;
    const nonReturnablePercentage = total > 0 ? ((itemCounts.nonReturnable / total) * 100).toFixed(2) : 0;

    return [
      { type: 'Returnable', percentage: parseFloat(returnablePercentage) },
      { type: 'Non-Returnable', percentage: parseFloat(nonReturnablePercentage) },
    ];
  };

  const dataSource = data ? processRequestData(data) : [];

  return (
    <PieChart
      id="pie"
      palette="Bright"
      dataSource={dataSource}
      title="% of Returnable items and Non-Returnable items requested"
    >
      <Legend
        orientation="horizontal"
        itemTextPosition="right"
        horizontalAlignment="center"
        verticalAlignment="bottom"
        columnCount={4}
        customizeText={(arg) => {
          return `${arg.pointName}`
        }} 
      />
      <Export enabled={true} />
      <Series argumentField="type" valueField="percentage">
        <Label visible={true} position="columns" customizeText={customizeText}>
          <Font size={16} />
          <Connector visible={true} width={0.5} />
        </Label>
      </Series>
      <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
    </PieChart>
  );
};

export default PieChartRender;
