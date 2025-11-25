
    const SUPABASE_URL = "https://itvdszqzdigmdhtrwupz.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dmRzenF6ZGlnbWRodHJ3dXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjg4ODYsImV4cCI6MjA3Nzg0NDg4Nn0.w0OJzxZtabTYjmUWaeva3s8tmpSVbwHsd2wzZ3ynQEg";
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let currentEditId = null;

    // Login
    async function login() { //função de login assíncrona que autentica via supabase
      const email = document.getElementById("email").value; // pega os valores dos campos email e senha
      const password = document.getElementById("password").value; // pega os valores dos campos email e senha

      const { data, error } = await supabase.auth.signInWithPassword({ // chamada ao método signInWithPassword do Supabase (retorna data e error)
        email, password
      });

      if (error) { // se houver erro, mostra mensagem; caso contrário, exibe app
        document.getElementById("msg-login").textContent = "Login inválido!";
      } else { 
        document.getElementById("login-container").style.display = "none"; // oculta a seção de login
        document.getElementById("app-container").style.display = "block"; //mostra o container principal da aplicação
        listarProdutos(); // carrega listas iniciais de produtos, clientes e fornecedores
        listarClientes(); // carrega listas iniciais de produtos, clientes e fornecedores
        listarFornecedores();// carrega listas iniciais de produtos, clientes e fornecedores
      }
    }

    async function logout() { //função para deslogar o usuário usando Supabase e voltar à tela de login
      await supabase.auth.signOut();
      document.getElementById("login-container").style.display = "flex";
      document.getElementById("app-container").style.display = "none";
    }

    // Tabs
    function switchTab(tab) { //função para alternar abas (marca botão clicado como ativo e mostra o conteúdo)
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      event.target.classList.add('active');
      document.getElementById(`tab-${tab}`).classList.add('active');
    }

    // PRODUTOS
    async function addProduto() {  //função para adicionar um produto
      const nome = document.getElementById("prod-nome").value; //lê os inputs de produto
      const quantidade = parseInt(document.getElementById("prod-quantidade").value); //lê os inputs de produto
      const preco = parseFloat(document.getElementById("prod-preco").value); //lê os inputs de produto
      const categoria = document.getElementById("prod-categoria").value; //lê os inputs de produto

      if (!nome || !quantidade || !preco) { // Validação simples. Precisa preencher nome,quantidade e preço
        alert("Preencha todos os campos!");
        return;
      }

      const { error } = await supabase //insere um novo registro na tabela 'produtos' do Supabase
        .from("produtos")
        .insert([{ nome, quantidade, preco, categoria }]);

      if (error) { //se erro, alerta; se sucesso, limpa campos e recarrega lista
        alert("Erro ao cadastrar!");
      } else {
        listarProdutos();
        document.getElementById("prod-nome").value = "";
        document.getElementById("prod-quantidade").value = "";
        document.getElementById("prod-preco").value = "";
        document.getElementById("prod-categoria").value = "";
      }
    }

    async function listarProdutos() { //função que busca produtos no Supabase e atualiza na tabela
      const { data, error } = await supabase.from("produtos").select("*").order('id', { ascending: false });
      const tbody = document.getElementById("tbody-produtos");
      tbody.innerHTML = "";

      if (data) {
        data.forEach((p) => {
          const tr = document.createElement("tr"); //insere HTML na linha com colunas e botões de ação
          tr.innerHTML = ` 
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td>${p.quantidade}</td>
            <td>R$ ${p.preco.toFixed(2)}</td>
            <td>${p.categoria || '-'}</td>
            <td>
              <div class="action-buttons">
                <button class="btn-edit" onclick="editarProduto(${p.id})">Editar</button>
                <button class="btn-delete" onclick="excluirProduto(${p.id})">Excluir</button>
              </div>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
    }

    async function editarProduto(id) { //busca um produto específico por id e abre modal para edição
      const { data, error } = await supabase.from("produtos").select("*").eq("id", id).single();
      
      if (data) {
        currentEditId = id; //armazena temporariamente o id sendo editado
        document.getElementById("edit-prod-nome").value = data.nome; // preenche campos do modal com os valores do produto
        document.getElementById("edit-prod-quantidade").value = data.quantidade; // preenche campos do modal com os valores do produto
        document.getElementById("edit-prod-preco").value = data.preco; // preenche campos do modal com os valores do produto
        document.getElementById("edit-prod-categoria").value = data.categoria || ''; // preenche campos do modal com os valores do produto
        document.getElementById("modal-edit-produto").classList.add("active"); // abre o modal adicionando a classe 'active'
      }
    }

    async function saveProduto() { // salva alterações do produto no banco usando currentEditId
      const nome = document.getElementById("edit-prod-nome").value;
      const quantidade = parseInt(document.getElementById("edit-prod-quantidade").value);
      const preco = parseFloat(document.getElementById("edit-prod-preco").value);
      const categoria = document.getElementById("edit-prod-categoria").value;

      const { error } = await supabase // atualização no Supabase filtrando pelo id armazenado
        .from("produtos")
        .update({ nome, quantidade, preco, categoria })
        .eq("id", currentEditId);

      if (error) {
        alert("Erro ao editar!");
      } else {
        closeModal('produto'); //fecha modal e recarrega lista
        listarProdutos();
      }
    }

    async function excluirProduto(id) { //exclui um produto após confirmação do usuário
      if (confirm("Deseja realmente excluir este produto?")) {
        const { error } = await supabase.from("produtos").delete().eq("id", id);
        if (error) alert("Erro ao excluir!");
        else listarProdutos();
      }
    }

    // CLIENTES
    async function addCliente() { //função para adicionar cliente (insere registro na tabela 'clientes')
      const nome = document.getElementById("cli-nome").value;
      const email = document.getElementById("cli-email").value;
      const telefone = document.getElementById("cli-telefone").value;
      const cpf = document.getElementById("cli-cpf").value;
      const cidade = document.getElementById("cli-cidade").value;

      if (!nome || !email) { //validação simples exigindo nome e email
        alert("Preencha pelo menos nome e email!");
        return;
      }

      const { error } = await supabase //insere no Supabase na tabela 'clientes'
        .from("clientes")
        .insert([{ nome, email, telefone, cpf, cidade }]);

      if (error) {
        alert("Erro ao cadastrar!");
      } else {
        listarClientes(); // limpa campos e recarrega a lista de clientes
        document.getElementById("cli-nome").value = "";
        document.getElementById("cli-email").value = "";
        document.getElementById("cli-telefone").value = "";
        document.getElementById("cli-cpf").value = "";
        document.getElementById("cli-cidade").value = "";
      }
    }

    async function listarClientes() { //lista clientes e renderiza na tabela correspondente
      const { data, error } = await supabase.from("clientes").select("*").order('id', { ascending: false });
      const tbody = document.getElementById("tbody-clientes");
      tbody.innerHTML = "";

      if (data) {
        data.forEach((c) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${c.id}</td>
            <td>${c.nome}</td>
            <td>${c.email}</td>
            <td>${c.telefone || '-'}</td>
            <td>${c.cpf || '-'}</td>
            <td>${c.cidade || '-'}</td>
            <td>
              <div class="action-buttons">
                <button class="btn-edit" onclick="editarCliente(${c.id})">Editar</button>
                <button class="btn-delete" onclick="excluirCliente(${c.id})">Excluir</button>
              </div>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
    }

    async function editarCliente(id) { //carrega dados de um cliente para edição e abre modal
      const { data, error } = await supabase.from("clientes").select("*").eq("id", id).single();
      
      if (data) {
        currentEditId = id;
        document.getElementById("edit-cli-nome").value = data.nome;
        document.getElementById("edit-cli-email").value = data.email;
        document.getElementById("edit-cli-telefone").value = data.telefone || '';
        document.getElementById("edit-cli-cpf").value = data.cpf || '';
        document.getElementById("edit-cli-cidade").value = data.cidade || '';
        document.getElementById("modal-edit-cliente").classList.add("active");
      }
    }

    async function saveCliente() { // salva alterações do cliente no banco
      const nome = document.getElementById("edit-cli-nome").value;
      const email = document.getElementById("edit-cli-email").value;
      const telefone = document.getElementById("edit-cli-telefone").value;
      const cpf = document.getElementById("edit-cli-cpf").value;
      const cidade = document.getElementById("edit-cli-cidade").value;

      const { error } = await supabase
        .from("clientes")
        .update({ nome, email, telefone, cpf, cidade })
        .eq("id", currentEditId);

      if (error) {
        alert("Erro ao editar!");
      } else {
        closeModal('cliente');
        listarClientes();
      }
    }

    async function excluirCliente(id) { //exclui cliente após confirmação
      if (confirm("Deseja realmente excluir este cliente?")) {
        const { error } = await supabase.from("clientes").delete().eq("id", id);
        if (error) alert("Erro ao excluir!");
        else listarClientes();
      }
    }

    // FORNECEDORES
    async function addFornecedor() { //adiciona fornecedor na tabela 'fornecedores'
      const nome = document.getElementById("forn-nome").value;
      const cnpj = document.getElementById("forn-cnpj").value;
      const email = document.getElementById("forn-email").value;
      const telefone = document.getElementById("forn-telefone").value;
      const cidade = document.getElementById("forn-cidade").value;
      const produto = document.getElementById("forn-produto").value;

      if (!nome || !cnpj) {
        alert("Preencha pelo menos nome e CNPJ!");
        return;
      }

      const { error } = await supabase
        .from("fornecedores")
        .insert([{ nome, cnpj, email, telefone, cidade, produto }]);

      if (error) {
        alert("Erro ao cadastrar!");
      } else {
        listarFornecedores();
        document.getElementById("forn-nome").value = "";
        document.getElementById("forn-cnpj").value = "";
        document.getElementById("forn-email").value = "";
        document.getElementById("forn-telefone").value = "";
        document.getElementById("forn-cidade").value = "";
        document.getElementById("forn-produto").value = "";
      }
    }

    async function listarFornecedores() { // lista fornecedores e renderiza na tabela
      const { data, error } = await supabase.from("fornecedores").select("*").order('id', { ascending: false });
      const tbody = document.getElementById("tbody-fornecedores");
      tbody.innerHTML = "";

      if (data) {
        data.forEach((f) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${f.id}</td>
            <td>${f.nome}</td>
            <td>${f.cnpj}</td>
            <td>${f.email || '-'}</td>
            <td>${f.telefone || '-'}</td>
            <td>${f.cidade || '-'}</td>
            <td>${f.produto || '-'}</td>
            <td>
              <div class="action-buttons">
                <button class="btn-edit" onclick="editarFornecedor(${f.id})">Editar</button>
                <button class="btn-delete" onclick="excluirFornecedor(${f.id})">Excluir</button>
              </div>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
    }

    async function editarFornecedor(id) { // carrega fornecedor para edição e abre modal
      const { data, error } = await supabase.from("fornecedores").select("*").eq("id", id).single();
      
      if (data) {
        currentEditId = id;
        document.getElementById("edit-forn-nome").value = data.nome;
        document.getElementById("edit-forn-cnpj").value = data.cnpj;
        document.getElementById("edit-forn-email").value = data.email || '';
        document.getElementById("edit-forn-telefone").value = data.telefone || '';
        document.getElementById("edit-forn-cidade").value = data.cidade || '';
        document.getElementById("edit-forn-produto").value = data.produto || '';
        document.getElementById("modal-edit-fornecedor").classList.add("active");
      }
    }

    async function saveFornecedor() { // salva alterações do fornecedor no banco
      const nome = document.getElementById("edit-forn-nome").value;
      const cnpj = document.getElementById("edit-forn-cnpj").value;
      const email = document.getElementById("edit-forn-email").value;
      const telefone = document.getElementById("edit-forn-telefone").value;
      const cidade = document.getElementById("edit-forn-cidade").value;
      const produto = document.getElementById("edit-forn-produto").value;

      const { error } = await supabase
        .from("fornecedores")
        .update({ nome, cnpj, email, telefone, cidade, produto })
        .eq("id", currentEditId);

      if (error) {
        alert("Erro ao editar!");
      } else {
        closeModal('fornecedor');
        listarFornecedores();
      }
    }

    async function excluirFornecedor(id) { //exclui fornecedor após confirmação
      if (confirm("Deseja realmente excluir este fornecedor?")) {
        const { error } = await supabase.from("fornecedores").delete().eq("id", id);
        if (error) alert("Erro ao excluir!");
        else listarFornecedores();
      }
    }

    // Modal
    function closeModal(type) {
      document.getElementById(`modal-edit-${type}`).classList.remove("active");
      currentEditId = null;
    }

    // Fecha modal ao clicar fora
    window.onclick = function(event) {
      if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
      }
    }
  
