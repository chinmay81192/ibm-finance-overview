import React from "react";
import { render, screen } from "@testing-library/react";
import BalanceSheet from "./index";
import { wait } from "@testing-library/user-event/dist/utils";
import { act } from "react-dom/test-utils";

describe("Balance Sheet Component", () => {
  test("renders annual option", () => {
    render(<BalanceSheet />);
    const linkElement = screen.getByText(/annual/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders quaterly option", () => {
    render(<BalanceSheet />);
    const linkElement = screen.getByText(/quaterly/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders proper dates when selected annual option", async () => {
    render(<BalanceSheet />);
    const dates = [
      "2022-12-31",
      "2021-12-31",
      "2020-12-31",
      "2019-12-31",
      "2018-12-31",
    ];

    act(() => {
      const button = screen.getByTestId("option-annual");
      button.click();
    });

    await wait(1000);
    dates.forEach((date) => {
      const element = screen.getByText(date);
      expect(element).toBeInTheDocument();
    });
  });

  test("renders proper dates when selected quaterly option", async () => {
    render(<BalanceSheet />);
    const dates = [
      "2023-06-30",
      "2023-03-31",
      "2022-12-31",
      "2022-09-30",
      "2022-06-30",
      "2022-03-31",
      "2021-12-31",
      "2021-09-30",
    ];
    act(() => {
      const button = screen.getByTestId("option-quaterly");
      button.click();
    });
    await wait(1000);
    dates.forEach((date) => {
      const element = screen.getByText(date);
      expect(element).toBeInTheDocument();
    });
  });
});
