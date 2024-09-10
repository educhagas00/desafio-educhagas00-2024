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

        //analisando cada recinto
        this.recintos.forEach(recinto => {

            // espaço ocupado pelos animais ja inseridos no recinto
            const espacoOcupado = recinto.animais.reduce((total, atual) => {
                return total + (this.animais[atual.especie].tamanho * atual.quantidade); 
            }, 0);

            // espaço livre antes da inserção de animais
            let espacoDisponivel = recinto.tamanho_total - espacoOcupado;
            

            if((recinto.animais.length > 0) && (recinto.animais.some(a => a.especie !== animal)))
            {
                espacoDisponivel -= 1;
            }

            // se da pra encaixar animal ou nao
            let espacoSuficiente = espacoDisponivel >= espacoNecessario; 


            //animais apenas no bioma apropriadoec
            let biomaApropriado = recinto.bioma.some(b => listaAnimal.bioma.includes(b));


            const espacoRestante = espacoDisponivel - espacoNecessario;

            // logica dos macacos carentes
            if(animal === "MACACO" && quantidade === 1) {
                biomaApropriado = recinto.animais.length > 0 // se tiver pelo menos um animal, sempre sera verdadeiro
            }

            // logica carnivoros
            const possuiCarnivoros = recinto.animais.some(a => this.animais[a.especie].carnivoro); // se tem carnivoros
            
            if (listaAnimal.carnivoro) { // se o animal é de fato carnivoro
                // se houve qualquer animal diferente no recinto, nao adiciona
                if(recinto.animais.some(a => a.especie !== animal)) { 
                    biomaApropriado = false;
                }

            } else{
                // se o animal não for carnivoro, porém possui carnivoros, não pode adicionar
                if (possuiCarnivoros) {
                    biomaApropriado = false;
                }
            }


            // logica hipopotamo
            const temHipopotamo =  recinto.animais.some(a => this.animais[a.especie] === 'HIPOPOTAMO');
            // se tem hipopotamos no recinto

            if (animal === "HIPOPOTAMO") { // se o animal for um hipopotamo
                // se houver animais no recinto diferente dele e não estiver em savana e rio
                if(recinto.animais.some(a => a.especie !== animal) && (!recinto.bioma.includes('savana') || !recinto.bioma.includes('rio'))) {
                    biomaApropriado = false;
                }
            }
            // se o animal não for hipopotamo e tivermos hipos no recinto
            else if(temHipopotamo) {
                    // caso o recinto nao seja savana e rio, nao é um bioma apropriado
                    if(!(recinto.bioma.includes('savana') && recinto.bioma.includes('rio'))) {
                        biomaApropriado = false;
                    }
            }


            // se o recinto for viavel, adicionar no array 
            if(espacoSuficiente && biomaApropriado) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoRestante} total: ${recinto.tamanho_total})`);
            }
            
     
        });

        if(recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };

    }
    

}

export { RecintosZoo as RecintosZoo };
