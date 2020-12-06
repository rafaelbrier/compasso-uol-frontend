import ErrorMessage from "components/error-message/ErrorMessage";
import React from "react";
import IMAGES_PATH from "utils/images-path";
import ErrorResponse from "utils/types/ErrorResponse";
import UserResponse from "utils/types/UserResponse";
import useRequestState from "./../../utils/hooks/useRequestState";
import CardPesquisa from "./components/card-pesquisa/CardPesquisa";
import CardUsuario from "./components/card-usuario/CardUsuario";
import InputPesquisar from "./components/input-pesquisar/InputPesquisar";

export interface HomeProps {}
const Home: React.FC<HomeProps> = () => {
    const {
        run: runBuscarUsuario,
        requestState: requestStateBuscarUsuario,
    } = useRequestState<UserResponse, ErrorResponse>();

    return (
        <div className="m-5">
            <CardPesquisa imageSrc={IMAGES_PATH.GITHUB_LOGO} centerX>
                <div className="mx-3 mt-1">
                    <h5 className="mt-0">Pesquisar usuário Git</h5>

                    <InputPesquisar
                        run={runBuscarUsuario}
                        isLoading={requestStateBuscarUsuario.isLoading}
                    />
                    <ErrorMessage
                        hasError={Boolean(requestStateBuscarUsuario.error)}
                        clientMessage="Usuário não encontrado!"
                        status={requestStateBuscarUsuario.status}
                        serverMessage={requestStateBuscarUsuario.error?.message}
                    />
                    <CardUsuario user={requestStateBuscarUsuario.data} />
                </div>
            </CardPesquisa>
        </div>
    );
};

export default Home;
