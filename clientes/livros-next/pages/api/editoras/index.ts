// pages/api/editoras/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '@/classes/controle/ControleEditora';

// Instância exportável de ControleEditora
export const controleEditora = new ControleEditora();

// Função de tratamento de solicitações
export default (req: NextApiRequest, res: NextApiResponse) => {
    let { method } = req;

    try {
        switch (method) {
            case 'GET':
                // Instrução c: responder com status 200 e o vetor de editoras em formato JSON
                let editoras = controleEditora.getEditoras();
                res.status(200).json(editoras);
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
