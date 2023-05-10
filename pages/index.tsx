import React, { useState, useEffect } from "react";

import InfoCard from "components/Cards/InfoCard";
import PageTitle from "components/Typography/PageTitle";
import RoundIcon from "components/RoundIcon";
import Layout from "containers/Layout";
import response, { ITableData } from "utils/demo/tableData";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "icons";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from "@roketid/windmill-react-ui";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ITableData[]>([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p: number) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  const badgeColor = {
    "On Rent": "success",
    Disabled: "danger",
    "Out of stock": "primary",
  };

  return (
    <Layout>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="89">
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total products" value="6,760">
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total products on rent" value="376">
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Example" value="35">
          {/* @ts-ignore */}
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Products</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((product, i) => (
              <TableRow key={i} className="hover:bg-gray-700 cursor-pointer">
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={product.avatar}
                      size="large"
                      alt="product image image"
                    />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {product.job}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {product.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={badgeColor[product.status]}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(product.date).toLocaleDateString()}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
}

export default Dashboard;

export async function getServerSideProps() {
  const response: any = await fetch(
    "https://rickandmortyapi.com/api/character"
  );
  const data = await response.json();

  return { props: { response: data.results } };
}
