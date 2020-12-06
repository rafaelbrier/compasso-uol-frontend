import ErrorMessage from "components/error-message/ErrorMessage";
import React from "react";
import IMAGES_PATH from "utils/images-path";
import ErrorResponse from "utils/types/ErrorResponse";
import UserResponse from "utils/types/UserResponse";
import useRequestState from "./../../utils/hooks/useRequestState";
import RepoResponse from "./../../utils/types/RepoResponse";
import CardPesquisa from "./components/card-pesquisa/CardPesquisa";
import CardUsuario from "./components/card-usuario/CardUsuario";
import InputPesquisar from "./components/input-pesquisar/InputPesquisar";

export interface HomeProps {}
const Home: React.FC<HomeProps> = () => {
    const {
        run: runBuscarUsuario,
        requestState: requestStateBuscarUsuario,
    } = useRequestState<UserResponse, ErrorResponse>();

    const reposRequest = useRequestState<RepoResponse[], ErrorResponse>();
    const starredRequest = useRequestState<RepoResponse[], ErrorResponse>();

    return (
        <div className="mt-3 m-lg-5">
            <CardPesquisa imageSrc={IMAGES_PATH.GITHUB_LOGO} centerX>
                <div className="mx-3 mt-1">
                    <h5 className="mt-0">Pesquisar usuário Git</h5>

                    <InputPesquisar
                        run={runBuscarUsuario}
                        isLoading={requestStateBuscarUsuario.isLoading}
                    />
                    <ErrorMessage
                        hasError={Boolean(requestStateBuscarUsuario.error)}
                        clientMessage={{
                            403: "Número de tentativas de busca excedido",
                            404: "Usuário não encontrado",
                            500: "Um erro desconhecido ocorreu ao pesquisar o usuário :(",
                        }}
                        status={requestStateBuscarUsuario.status}
                        serverMessage={requestStateBuscarUsuario.error?.message}
                        showServerMessage
                    />
                    <CardUsuario
                        user={requestStateBuscarUsuario.data}
                        reposRequest={reposRequest}
                        starredRequest={starredRequest}
                    />
                </div>
            </CardPesquisa>
            {/* <CardListaRepo> */}
        </div>
    );
};

export default Home;
