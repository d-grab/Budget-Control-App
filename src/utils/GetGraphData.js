import { useEffect, useState } from "react";
import moment from "moment";
import { useCollection } from "customHooks/useCollection";

const GetGraphData = (filter) => {
  const [inTransData, setInTransData] = useState({
    LabelArray: [],
    DataArray: [],
  });
  const [outTransData, setOutTransData] = useState({
    LabelArray: [],
    DataArray: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { documents } = useCollection("transactions", ["createdAt", "desc"]);
  const [docLength, setDocLength] = useState(0);

  useEffect(() => {
    if (documents && documents.length > 0) {
      let InTransLabelArray = [];
      let InTransDataArray = [];

      let OutTransLabelArray = [];
      let OutTransDataArray = [];

      documents.forEach((doc) => {
        const unix_timestamp = doc.createdAt.seconds;
        const formattedTimestamp = moment
          .unix(unix_timestamp)
          .format("MMMM D, h:mm a");

        if (doc.category === "#income") {
          InTransLabelArray.push(formattedTimestamp);
          InTransDataArray.push(parseInt(doc.amount));
        } else {
          if (
            (filter.category === "#all" || filter.category === doc.category) &&
            (filter.plan === "all" || filter.plan === doc.plan)
          ) {
            OutTransLabelArray.push(formattedTimestamp);
            OutTransDataArray.push(parseInt(doc.amount));
          }
        }
      });
      InTransLabelArray = InTransLabelArray.reverse();
      InTransDataArray = InTransDataArray.reverse();

      OutTransLabelArray = OutTransLabelArray.reverse();
      OutTransDataArray = OutTransDataArray.reverse();

      setInTransData({
        LabelArray: InTransLabelArray,
        DataArray: InTransDataArray,
      });
      setOutTransData({
        LabelArray: OutTransLabelArray,
        DataArray: OutTransDataArray,
      });

      setIsLoading(false);
      setDocLength(documents.length);
    } else if (documents) {
      setIsLoading(false);
      setDocLength(documents.length);
    }
  }, [documents, filter]);

  const inData = {
    labels: inTransData.LabelArray,
    datasets: [
      {
        label: "Income Transactions",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: inTransData.DataArray,
      },
    ],
  };

  const outData = {
    labels: outTransData.LabelArray,
    datasets: [
      {
        label: "Spending Transactions",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: outTransData.DataArray,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return { isLoading, inData, outData, options, docLength };
};

export default GetGraphData;
