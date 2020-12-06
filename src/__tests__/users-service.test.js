/**  * @jest-environment jsdom-sixteen  */

import { fireEvent, render, waitFor } from "@testing-library/react";
import apiGit from "api/git/api-git";
import Home from "pages/home/Home";
import React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import { GIT_USER_MOCK } from "../__mocks__/api-git/git-user.mock";

// const mockAxios = jest.genMockFromModule("axios");
// mockAxios.create = jest.fn(() => mockAxios);

describe("Testa os fluxos da tela HOME", () => {
    let mockGet = jest.SpyInstance;

    beforeEach(() => {
        mockGet = jest.spyOn(apiGit, "get");
        // Axios MOCK
        mockGet.mockImplementation(() =>
            Promise.resolve({ data: GIT_USER_MOCK })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Testa a busca de um usuário e a renderização do componente que o exibe, quando passa-se o nome pela URL", async () => {
        //Renderiza a página Home [passando /rafaelbrier na rota]
        const component = render(
            <MemoryRouter initialEntries={["/rafaelbrier"]}>
                <Route path="/:nomePesquisa?">
                    <Home />
                </Route>
            </MemoryRouter>
        );
        //Verifica se o cardUsuario foi renderizado e se um dos campos está correto
        await waitFor(() =>
            expect(
                component.container.querySelector("#user-bio").textContent
            ).toBe(GIT_USER_MOCK.bio)
        );
    });

    test("Testa a busca de um usuário e a renderização do componente que o exibe, quando clica-se no botão pesquisar", async () => {
        //Renderiza a página Home
        const component = render(
            <MemoryRouter initialEntries={["/"]}>
                <Route path="/:nomePesquisa?">
                    <Home />
                </Route>
            </MemoryRouter>
        );

        //Busca o input
        const input = component.container.querySelector("#input-pesquisar");

        //Escreve no input
        act(() => {
            fireEvent.change(input, { target: { value: "rafaelbrier" } });
        });

        //Busca o botão de pesquisar usuário
        const btn = component.container.querySelector("#btn-pesquisar");

        //Chama evento de clicar no Botão
        act(() => {
            fireEvent.click(btn);
        });

        //Verifica se o cardUsuario foi renderizado e se um dos campos está correto
        await waitFor(() =>
            expect(
                component.container.querySelector("#user-bio").textContent
            ).toBe(GIT_USER_MOCK.bio)
        );
    });
});
