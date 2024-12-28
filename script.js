function cadastrarRegistro(nome,telefone,cpf,marca,modelo,placa,dataRetirada,dataEntrega,dias,diaria) {
    
    // Captura os valores do formulário
   
    var  nome = document.getElementById("nome").value;    
    var  telefone = document.getElementById("telefone").value;
    var  cpf = document.getElementById("cpf").value;
    var  marca = document.getElementById("marca").value;
    var  modelo = document.getElementById("modelo").value;
    var  placa = document.getElementById("placa").value;
    var  dataRetirada = document.getElementById("dataRetirada").value;
    var  dataEntrega = document.getElementById("dataEntrega").value;
    var  dias = document.getElementById("dias").value;
    var  diaria = document.getElementById("diaria").value;
    // Cria um objeto com os dados a serem enviados
    var data = {
  
        nome: nome,        
        telefone: telefone,
        cpf: cpf,
        marca: marca,
        modelo: modelo,          
        placa: placa,
        dataRetirada: dataRetirada,
        dataEntrega: dataEntrega,
        dias: dias,
        diaria: diaria
            
    };

    // Envia os dados para o servidor
    fetch('http://localhost:8080/locadora', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar registro.');
            
        }
        return response.json();
    })
    .then(data => {
        console.log( 'Registro cadastrado com sucesso:', data);
        alert("Cadastro realizado com sucesso !")
        fetchDataAndPopulateTable();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
     
     document.getElementById("nome").value ="";   
     document.getElementById("telefone").value ="";
     document.getElementById("cpf").value ="";
     document.getElementById("marca").value ="";
     document.getElementById("modelo").value ="";
     document.getElementById("placa").value ="";
     document.getElementById("dataRetirada").value ="";
     document.getElementById("dataEntrega").value ="";
     document.getElementById("dias").value =""; 
     document.getElementById("diaria").value ="";
    
   
}
    function validarFormulario() { 
        
    var nome = document.getElementById('nome').value;    
    var telefone = document.getElementById('telefone').value;
    var cpf = document.getElementById('cpf').value;
    var marca = document.getElementById('marca').value;
    var modelo = document.getElementById('modelo').value; 
    var placa = document.getElementById('placa').value;    
    var dataRetirada = document.getElementById('dataRetirada').value;
    var dataEntrega = document.getElementById('dataEntrega').value;
    var dias = document.getElementById('dias').value;
    var diaria = document.getElementById('dataRetirada').value;
    
   
    if (nome === '') {
        alert('Por favor, preencha o campo Nome.');
        return false;
    }
    

    if (telefone === '') {
        alert('Por favor, preencha o campo Telefone.');
        return false;
    }

    if (cpf === '') {
        alert('Por favor, preencha o campo cpf.');
        return false;
    }

    if (marca === '') {
        alert('Por favor, preencha o campo marca.');
        return false;
    }

    if (modelo === '') {
        alert('Por favor, preencha o campo modelo.');
        return false;
    }
    
    if (placa === '') {
        alert('Por favor, preencha o campo placa.');
        return false;
    }
    
    
    if (dataRetirada === '') {
        alert('Por favor, preencha o campo data de retirada.');
        return false;
    }

    if (dataEntrega === '') {
        alert('Por favor, preencha o campo data de entrega.');
        return false;
    }

    if (dias === '') {
        alert('Por favor, preencha o campo dias.');
        return false;
    }

    if (diaria === '') {
        alert('Por favor, preencha o campo diaria.');
        return false;
    }

    // Se a validação passar, você pode chamar a função para salvar os registros
     cadastrarRegistro(nome,telefone,cpf,marca,modelo,placa,dataRetirada,dataEntrega,dias,diaria);

    // Retorna true para permitir o envio do formulário após salvar os registros
    return true;
}



async function fetchDataAndPopulateTable() {
    try {
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API
      const response = await fetch( 'http://localhost:8080/locadora');
      const data = await response.json();

      // Limpa a tabela antes de inserir novos dados
      const tbody = document.querySelector('#tabela tbody');
      tbody.innerHTML = '';

      // Preenche a tabela com os dados recebidos da API
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.id}</td>                
          <td>${item.nome}</td>       
          <td>${item.cpf}</td>        
          <td>${item.telefone}</td>
          <td>${item.marca}</td>
          <td>${item.modelo}</td>
          <td>${item.placa}</td>          
          <td>${item.dataRetirada}</td>          
          <td>${item.dataEntrega}</td> 
          <td>${item.dias}</td>   
          <td>${item.diaria}</td>
          <td>${item.total}</td> 
          <td>${item.status}</td>     
          <td><button  class="btn btn-eye" title="Visualizar"  onclick="buscarDados(${item.id})"><i class="fas fa-eye"></i></button></td>          
          <td><button  class="btn btn-trash" title="Excluir" onclick="deletarRegistro(${item.id})"> <i class="fas fa-trash-alt"></i></button></td> `;
        
          
          tbody.appendChild(row);
      });
    } catch (error) {
      console.error('Erro ao buscar e preencher dados:', error);
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
  // Chama a função para buscar e preencher os dados quando a página carrega
   fetchDataAndPopulateTable();
});
 

async function buscarDados(id) {
    try { 
        // URL da API, substitua pela sua URL
        const response = await fetch(`http://localhost:8080/locadora/${id}`);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }

        // Converte a resposta em JSON
        const data = await response.json();
        openModal();
      

      document.getElementById('id').value = data.id;      
      document.getElementById('nome').value = data.nome;
      document.getElementById('cpf').value = data.cpf;  
      document.getElementById('telefone').value = data.telefone;
      document.getElementById('marca').value = data.marca;
      document.getElementById('modelo').value = data.modelo; 
      document.getElementById('placa').value = data.placa;       
      document.getElementById('dataRetirada').value = data.dataRetirada; 
      document.getElementById('dataEntrega').value = data.dataEntrega; 
      document.getElementById('dias').value = data.dias; 
      document.getElementById('diaria').value = data.diaria; 
      document.getElementById('total').value = data.total; 
      document.getElementById('status').value = data.status; 


    } catch (error) {
    console.error('Erro:', error);
   }

  }
    

  function openModal() {

// Seleciona o modal pelo ID
   var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

// Abre o modal
  myModal.show();


}

async function updateUserData() {    
    const idInput =  document.getElementById("id");   
    const nomeInput = document.getElementById("nome");     
    const cpfInput = document.getElementById("cpf");
    const telefoneInput = document.getElementById("telefone");    
    const marcaInput = document.getElementById("marca"); 
    const modeloInput = document.getElementById("modelo");     
    const placaInput = document.getElementById("placa");   
    const dataRetiradaInput = document.getElementById("dataRetirada");   
    const dataEntregaInput = document.getElementById("dataEntrega");   
    const diasInput = document.getElementById("dias");   
    const diariaInput = document.getElementById("diaria");   
    const totalInput = document.getElementById("total");   
    const statusInput = document.getElementById("status");   
      
    const updateId =  idInput.value    
    const updateNome = nomeInput.value     
    const updateCpf =  cpfInput.value
    const updateTelefone =  telefoneInput.value
    const updateMarca = marcaInput.value
    const updateModelo = modeloInput.value
    const updatePlaca =  placaInput.value  
    const updateDataRetirada = dataRetiradaInput.value 
    const updateDataEntrega = dataEntregaInput.value 
    const updateDias = diasInput.value 
    const updateDiaria = diariaInput.value 
    const updateTotal = totalInput.value 
    const updateStatus = statusInput.value 

  
    try {
      const response =  await fetch(`http://localhost:8080/locadora`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updateId,                  
          nome: updateNome, 
          cpf: updateCpf,  
          telefone: updateTelefone,
          marca: updateMarca,  
          modelo: updateModelo,    
          placa: updatePlaca,        
          dataRetirada: updateDataRetirada,          
          dataEntrega: updateDataEntrega,        
          dias: updateDias,        
          diaria: updateDiaria, 
          total: updateTotal,
          status: updateStatus                
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
  
      alert('Dados do usuário atualizados com sucesso!');
      fetchDataAndPopulateTable();          
    } catch (error) {
      console.error(`Erro durante a atualização dos dados: ${error.message}`);
    }
    ocument.getElementById("id").value = "";       
    document.getElementById("nome").value = "";   
    document.getElementById("cpf").value ="";
    ocument.getElementById("telefone").value = ""; 
    ocument.getElementById("marca").value = "";   
    ocument.getElementById("modelo").value = "";   
    document.getElementById("placa").value ="";  
    ocument.getElementById("dataRetirada").value = "";   
    ocument.getElementById("dataEntrega").value = "";   
    ocument.getElementById("dias").value = "";   
    ocument.getElementById("diaria").value = "";   
    ocument.getElementById("total").value = "";   
    ocument.getElementById("status").value = "";   
  }


