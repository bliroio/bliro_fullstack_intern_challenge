import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MeetingFilter from '../../app/components/MeetingFilter';
test('renders MeetingFilter component', () => {
  const { getByLabelText, getByTestId } = render(
    <MeetingFilter filter="" sort="title" onFilterChange={() => {}} onSortChange={() => {}} />
  );

  const filterInput = getByLabelText('Filter by title');
  const sortSelect = getByTestId('sort-select');

  expect(filterInput).toBeInTheDocument();
  expect(sortSelect).toBeInTheDocument();
});

test('calls onFilterChange when filter input changes', () => {
  const mockFilterChange = jest.fn();

  const { getByLabelText } = render(
    <MeetingFilter filter="" sort="title" onFilterChange={mockFilterChange} onSortChange={() => {}} />
  );

  const filterInput = getByLabelText('Filter by title');

  fireEvent.change(filterInput, { target: { value: 'test' } });

  expect(mockFilterChange).toHaveBeenCalledWith('test');
});
  