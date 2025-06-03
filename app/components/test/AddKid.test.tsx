import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddKidModal, { KidProfile } from "../dashboard/modals/AddKidModal";

describe("AddKidModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("does not render when isOpen is false", () => {
    render(
      <AddKidModal isOpen={false} onClose={mockOnClose} onAdd={mockOnAdd} />
    );
    expect(screen.queryByText(/Add a profile!/)).not.toBeInTheDocument();
  });

  test("renders when isOpen is true", () => {
    render(
      <AddKidModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} />
    );
    expect(screen.getByText(/Add a profile!/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Age")).toBeInTheDocument();
  });

  test("closes the modal on overlay or close button click", () => {
    render(
      <AddKidModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} />
    );

    // Close by clicking overlay
    const overlay = screen
      .getByText(/Add a profile!/)
      .closest(".relative")?.previousSibling;
    fireEvent.click(overlay as HTMLElement);
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    // Close by clicking the close button
    fireEvent.click(screen.getByLabelText(/close modal/i));
    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });

  test("submits form with correct data", () => {
    render(
      <AddKidModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} />
    );

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByText(/Autism Spectrum Disorder/i));
    fireEvent.click(screen.getByLabelText(/prefer not to say/i));
    fireEvent.click(screen.getByRole("button", { name: /add profile/i }));

    expect(mockOnAdd).toHaveBeenCalledWith({
      name: "Alice",
      age: "10",
      conditions: ["asd"],
      preferNotToSay: true,
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  test("pre-fills form with initialData", () => {
    const initialData: Omit<KidProfile, "id"> = {
      name: "Tommy",
      age: "12",
      conditions: ["adhd", "dyslexia"],
      preferNotToSay: false,
    };

    render(
      <AddKidModal
        isOpen={true}
        onClose={mockOnClose}
        onAdd={mockOnAdd}
        initialData={initialData}
      />
    );

    expect(screen.getByDisplayValue("Tommy")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12")).toBeInTheDocument();
    expect(screen.getByText(/ADHD/)).toHaveClass("bg-[#6100FF]");
    expect(screen.getByText(/Dyslexia/)).toHaveClass("bg-[#6100FF]");
  });
});
