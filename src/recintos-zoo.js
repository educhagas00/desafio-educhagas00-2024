class RecintosZoo {

    constructor(){
        this.recintos = [
            { numero: 1, bioma: ['savana'], tamanho_total: 10, animais:[{especie: 'MACACO', quantidade: 3}]},
            { numero: 2, bioma: ['floresta'], tamanho_total: 5, animais: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanho_total: 7, animais:[{especie: 'GAZELA', quantidade: 1}]},
            { numero: 4, bioma: ['rio'], tamanho_total: 8, animais: [] },
            { numero: 5, bioma: ['savana'], tamanho_total: 9, animais:[{especie: 'LEAO', quantidade: 1}]}
        ];

        this.animais = {
            // tabela hash: identificador de chave e objeto
            LEAO:   {tamanho: 3, bioma: ['savana'], carnivoro: true},
            LEOPARDO:   {tamanho: 2, bioma: ['savana'], carnivoro: true},
            CROCODILO:   {tamanho: 3, bioma: ['rio'], carnivoro: true},
            MACACO:   {tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false},
            GAZELA:   {tamanho: 2, bioma: ['savana'], carnivoro: false},
            HIPOPOTAMO:   {tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false}
        };
    }

    //verificar se animal existe na tabela 
    isAnimalValido(animal) {
        return animal in this.animais;
    }

    //verificar se quantidade valida
    isQuantidadeValida(quantidade) {
        return quantidade > 0 && (Number.isInteger(quantidade));
    }



    analisaRecintos(animal, quantidade) {

        if(!this.isAnimalValido(animal)) {
            return { erro: "Animal inválido" };
        }

        if(!this.isQuantidadeValida(quantidade)) {
            return { erro: "Quantidade inválida" }; 
        }

        const recintosViaveis = [];
        const listaAnimal = this.animais[animal]; // informação do animal
        let espacoNecessario = listaAnimal.tamanho * quantidade; // espaço que animal ocupa

        
        //this.recintos[tamanho_total] - this.recintos[animais.quantidade] * listaAnimal.this.recintos.animais.especie;

        //analisando cada recinto
        this.recintos.forEach(recinto => {

            // espaço ocupado pelos animais ja inseridos no recinto
            const espacoOcupado = recinto.animais.reduce((total, atual) => {
                return total + (this.animais[atual.especie].tamanho * atual.quantidade); 
            }, 0);

            // espaço livre pra inserção de animais
            const espacoDisponivel = recinto.tamanho_total - espacoOcupado;
            
            // se da pra encaixar animal ou nao
            let espacoSuficiente = espacoDisponivel >= espacoNecessario; 

            if((recinto.animais.length > 0) && (recinto.animais.some(a => a.especie !== animal)))
            {
                espacoNecessario += 1;
                espacoSuficiente = espacoDisponivel >= espacoNecessario;
            }


            //animais apenas no bioma apropriadoec
            const biomaApropriado = recinto.bioma.some(b => listaAnimal.bioma.includes(b));



            if(espacoSuficiente && biomaApropriado) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total ${recinto.tamanho_total}`);
            }
            
     
        });

        if(recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };

       

    }
    

}

export { RecintosZoo as RecintosZoo };
