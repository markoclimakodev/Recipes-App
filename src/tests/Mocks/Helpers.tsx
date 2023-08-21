import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest';
import { mockMeals } from './Meals';
import { mockDrinks } from './Drinks';

export const renderWithRouterAndMock = (
  children: React.ReactNode,
  mockFetch: Mock<any, any>,
  roteInitial = '/',
) => {
  global.fetch = mockFetch;
  return {
    screen,
    user: userEvent,
    ...render(
      <MemoryRouter initialEntries={ [roteInitial] }>
        {children}
      </MemoryRouter>,
    ),
  };
};

export const mockFetchMeals = vi.fn().mockResolvedValue({
  json: async () => (mockMeals),
});

export const mockFetchDrinks = vi.fn().mockResolvedValue({
  json: async () => (mockDrinks),
});
