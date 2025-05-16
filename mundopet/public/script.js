// Função para realizar login
function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3006/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) throw new Error("Login falhou");
        return response.json();
    })
    .then(data => {
        alert(data.message);
        window.location.href = "Dashboard.html";
    })
    .catch(error => {
        console.error(error);
        alert("Usuário ou senha inválidos. Tente novamente.");
    });
}

// Função para registrar usuário
function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3006/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao cadastrar usuário");
        return response.json();
    })
    .then(data => {
        alert(data.message);
        window.location.href = "Login.html";
    })
    .catch(error => {
        console.error(error);
        alert("Erro ao cadastrar o usuário. Tente novamente.");
    });
}

// Função para buscar e exibir os usuários na dashboard
function loadUsers() {
    fetch("http://localhost:3006/users")
    .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar usuários");
        return response.json();
    })
    .then(data => {
        const userList = document.getElementById("userList");
        if (!userList) return;

        userList.innerHTML = "";
        data.forEach(user => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            listItem.innerHTML = `
                <span>${user.username}</span>
                <span class="badge bg-primary rounded-pill">ID: ${user.id}</span>
            `;
            userList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error(error);
        alert("Erro ao carregar usuários.");
    });
}

// Função para carregar os contatos registrados
function loadContatos() {
    fetch("http://localhost:3006/contato")
    .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar contatos");
        return response.json();
    })
    .then(data => {
        const contatosList = document.getElementById('contatosList');
        if (!contatosList) return;

        contatosList.innerHTML = '';

        data.forEach(contato => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <h5>${contato.nome}</h5>
                <p>Email: ${contato.email}<br>
                Número: ${contato.numero}<br>
                Mensagem: ${contato.mensagem}<br>
                Enviado em: ${new Date(contato.data_envio).toLocaleString()}</p>
            `;
            contatosList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error(error);
        alert("Erro ao carregar contatos.");
    });
}

// Submissão do formulário de contato
function submitContato(event) {
    event.preventDefault();

    const contato = {
        nome: document.getElementById('nome').value,
        numero: document.getElementById('numero').value,
        email: document.getElementById('email').value,
        mensagem: document.getElementById('mensagem').value
    };

    if (!contato.nome || !contato.numero || !contato.email || !contato.mensagem) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    fetch("http://localhost:3006/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contato)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao registrar contato');
        return response.json();
    })
    .then(data => {
        alert(data.message);
        window.location.href = "Login.html";
    })
    .catch(error => {
        console.error(error);
        alert("Erro ao registrar contato. Tente novamente.");
    });
}

// Detectar página atual e aplicar ações específicas
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("Login.html")) {
        document.getElementById("loginForm")?.addEventListener("submit", loginUser);
    }

    if (path.includes("RegistroADM.html")) {
        document.getElementById("registerForm")?.addEventListener("submit", registerUser);
    }

    if (path.includes("Contato.html")) {
        document.getElementById("contatoForm")?.addEventListener("submit", submitContato);
    }

    if (path.includes("Dashboard.html")) {
        loadUsers();
        loadContatos();
    }
});


// Função para carregar os agendamentos do pet
function loadCadastroPet() {
    fetch("http://localhost:3006/cadastro-pet")
    .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar agendamentos");
        return response.json();
    })
    .then(data => {
        const agendamentosList = document.getElementById('agendamentosList');
        if (!agendamentosList) return;
  
        agendamentosList.innerHTML = '';
  
        if (!Array.isArray(data) || data.length === 0) {
            agendamentosList.innerHTML = '<li class="list-group-item">Nenhum agendamento encontrado.</li>';
            return;
        }
  
        data.forEach(agendamento => {
            const listItem = document.createElement('li');
            listItem.className = "list-group-item";
            listItem.innerHTML = `
                <h5>${agendamento.name}</h5>
                <p>
                    Email: ${agendamento.email}<br>
                    Nome do Pet: ${agendamento["pet-name"]}<br>
                    Idade do Pet: ${agendamento["pet-age"]} anos<br>
                    Espécie: ${agendamento["pet-species"]}<br>
                    Observações: ${agendamento.message || 'Nenhuma'}<br>
                    Enviado em: ${agendamento.data_envio ? new Date(agendamento.data_envio).toLocaleString() : 'Data não disponível'}
                </p>
            `;
            agendamentosList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error(error);
        alert("Erro ao carregar agendamentos.");
    });
  }
  
  // Detectar página atual e aplicar ações específicas
  document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
  
    if (path.includes("Dashboard.html")) {
        // Outras funções que você já tem
        loadUsers();
        loadContatos();
  
        // Aqui carregue também os agendamentos
        loadCadastroPet();
    }
  
    // Outros event listeners de formulário que você já tem ...
  });
  
  




















