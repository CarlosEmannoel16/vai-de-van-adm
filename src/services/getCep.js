import axios from 'axios';

class CepService {
    async getByCep(cep) {
        return await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
    }
}
export const cepService = new CepService();
