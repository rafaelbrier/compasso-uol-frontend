import React, { useMemo } from "react";

export interface ErrorMessageProps {
    /**
     * Define se existe erro
     */
    hasError?: boolean;
    /**
     * O status do Erro
     */
    status?: number;
    /**
     * A mensagem de erro do Cliente
     */
    clientMessage?: string;
    /**
     * A mensagem de erro proveniente do Backend
     * @default "Um erro desconhecido ocorreu ao processar sua requisição. Por favor tente novamente ou contate um administrador do sistema."
     */
    serverMessage?: string;
    /**
     * Define se deve-se exibir a mensagem do servidor
     */
    showServerMessage?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
    hasError,
    status,
    clientMessage,
    serverMessage,
    showServerMessage,
}) => {
    const PrimaryMessage = useMemo(
        () => (
            <div className="text-danger h6 mb-0">
                {clientMessage ? clientMessage : serverMessage}
            </div>
        ),
        [clientMessage, serverMessage]
    );
    const SecondaryMessage = useMemo(
        () =>
            clientMessage && showServerMessage ? (
                <small className="text-danger">
                    {[status, serverMessage].filter(Boolean).join(" - ")}
                </small>
            ) : null,
        [status, showServerMessage, clientMessage, serverMessage]
    );

    return hasError ? (
        <div>
            {PrimaryMessage}
            {SecondaryMessage}
        </div>
    ) : null;
};

export default ErrorMessage;
