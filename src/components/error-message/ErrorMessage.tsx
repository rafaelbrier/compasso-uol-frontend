import React, { useMemo, useState } from "react";

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
     * A mensagem de erro do Cliente para cada status
     */
    clientMessage?: { [key: string]: string };
    /**
     * A mensagem de erro proveniente do Backend
     */
    serverMessage?: string;
    /**
     * Define se deve-se exibir a mensagem do servidor
     */
    showServerMessage?: boolean;
}

const STATUS_DEFAULT = 500;
const ErrorMessage: React.FC<ErrorMessageProps> = ({
    hasError,
    status,
    clientMessage,
    serverMessage,
    showServerMessage,
}) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const showSecondaryMessage = useMemo(
        () => clientMessage && showServerMessage,
        [clientMessage, showServerMessage]
    );

    const PrimaryMessage = useMemo(() => {
        const _status = status || STATUS_DEFAULT;
        const _clientMessage = clientMessage || {};
        return (
            <div className="text-danger h6 mb-0 d-flex-center-v">
                <span>
                    {_clientMessage[_status] ||
                        _clientMessage[STATUS_DEFAULT] ||
                        serverMessage}
                    {showSecondaryMessage && (
                        <button
                            className="btn btn-link p-0 pl-2 btn-no-focus d-flex-inline-center-v"
                            type="button"
                            onClick={() => setShowDetails((p) => !p)}
                        >
                            <small>{showDetails ? "-" : "+"} detalhes</small>
                        </button>
                    )}
                </span>
            </div>
        );
    }, [
        status,
        showDetails,
        showSecondaryMessage,
        clientMessage,
        serverMessage,
    ]);

    const SecondaryMessage = useMemo(
        () =>
            showSecondaryMessage && (
                <small className="text-danger">
                    {[status, serverMessage].filter(Boolean).join(" - ")}
                </small>
            ),
        [status, serverMessage, showSecondaryMessage]
    );

    return hasError ? (
        <div className="text-left">
            {PrimaryMessage}
            {showDetails && SecondaryMessage}
        </div>
    ) : null;
};

export default ErrorMessage;
