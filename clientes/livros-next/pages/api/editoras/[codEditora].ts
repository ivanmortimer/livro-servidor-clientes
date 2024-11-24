import { NextApiRequest, NextApiResponse } from "next";
import { controleEditora } from ".";

export default (req: NextApiRequest, res: NextApiResponse) => {
    let { method } = req;

    try {
        switch (method) {
            case 'GET':
                // Instrução c: responder com status 200 e o vetor de editoras em formato JSON
                let codEditora = req.query.codEditora;
                console.log("codEditora =", codEditora);
                let nomeEditora = controleEditora.getNomeEditora(Number(codEditora));
                res.status(200).json({"nome": nomeEditora});
                break;

            default:
                // Instrução d: Tratar status 405 para método não permitido
                res.setHeader('Allow', ['GET']);
                res.status(405).json({ message: `Método ${method} não permitido` });
                break;
        }
    } catch (error) {
        // Instrução d: Tratar status 500 para exceções no servidor
        res.status(500).json({ message: 'Erro interno no servidor', error: (error as Error).message });
    }
};
