document.addEventListener('DOMContentLoaded', function() {
    // Seleção dos elementos
    const form = document.getElementById('cadastroForm');
    const nomeCompleto = document.getElementById('nomeCompleto');
    const dataNascimento = document.getElementById('dataNascimento');
    const cpf = document.getElementById('cpf');
    const telefoneFixo = document.getElementById('telefoneFixo');
    const celular = document.getElementById('celular');
    const secaoMenorIdade = document.getElementById('secaoMenorIdade');
    const nomePai = document.getElementById('nomePai');
    const nomeMae = document.getElementById('nomeMae');
    const cep = document.getElementById('cep');
    const endereco = document.getElementById('endereco');
    const numero = document.getElementById('numero');
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const confirmarSenha = document.getElementById('confirmarSenha');
    const senhaStrength = document.getElementById('senha-strength');
    const senhaStrengthText = document.getElementById('senha-strength-text');
    const toastContainer = document.getElementById('toastContainer');
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const modalConfirm = document.getElementById('modalConfirm');
    
    // Objeto para armazenar as mensagens de erro
    const errorMessages = {
        nomeCompleto: document.getElementById('nomeCompleto-error'),
        dataNascimento: document.getElementById('dataNascimento-error'),
        cpf: document.getElementById('cpf-error'),
        telefoneFixo: document.getElementById('telefoneFixo-error'),
        celular: document.getElementById('celular-error'),
        nomePai: document.getElementById('nomePai-error'),
        nomeMae: document.getElementById('nomeMae-error'),
        cep: document.getElementById('cep-error'),
        endereco: document.getElementById('endereco-error'),
        numero: document.getElementById('numero-error'),
        cidade: document.getElementById('cidade-error'),
        estado: document.getElementById('estado-error'),
        email: document.getElementById('email-error'),
        senha: document.getElementById('senha-error'),
        confirmarSenha: document.getElementById('confirmarSenha-error')
    };
    
    // Configuração do modal de sucesso
    modalClose.addEventListener('click', function() {
        successModal.classList.remove('show');
    });
    
    modalConfirm.addEventListener('click', function() {
        successModal.classList.remove('show');
    });
    
    // Sistema de notificações toast
    function mostrarToast(tipo, mensagem, duracao = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${tipo}`;
        
        let icone = '';
        switch(tipo) {
            case 'success':
                icone = 'check-circle';
                break;
            case 'error':
                icone = 'exclamation-circle';
                break;
            case 'warning':
                icone = 'exclamation-triangle';
                break;
            case 'info':
                icone = 'info-circle';
                break;
        }
        
        toast.innerHTML = `
            <i class="fas fa-${icone} toast-icon"></i>
            <div class="toast-message">${mensagem}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Animar entrada
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remover após duração especificada
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, duracao);
    }
    
    // Adicionar efeito de foco nos grupos de formulário
    const inputContainers = document.querySelectorAll('.input-container input, .input-container select');
    inputContainers.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focado');
        });
        
        input.addEventListener('blur', function() {
            this.closest('.form-group').classList.remove('focado');
        });
    });
    
    // Adicionar máscaras e eventos de validação
    cpf.addEventListener('input', function(e) {
        mascaras.cpf(e.target);
        validarCPF(e.target);
    });
    
    telefoneFixo.addEventListener('input', function(e) {
        mascaras.telefoneFixo(e.target);
        validarTelefoneFixo(e.target);
    });
    
    celular.addEventListener('input', function(e) {
        mascaras.celular(e.target);
        validarCelular(e.target);
    });
    
    cep.addEventListener('input', function(e) {
        mascaras.cep(e.target);
        validarCEP(e.target);
    });
    
    // Evento para consultar o CEP quando o usuário sair do campo
    cep.addEventListener('blur', function() {
        const cepLimpo = cep.value.replace(/\D/g, '');
        if (cepLimpo.length === 8) {
            consultarCEP(cepLimpo);
        }
    });
    
    dataNascimento.addEventListener('change', function(e) {
        validarDataNascimento(e.target);
        verificarIdade(e.target);
    });
    
    nomeCompleto.addEventListener('input', function(e) {
        validarNomeCompleto(e.target);
    });
    
    nomePai.addEventListener('input', function(e) {
        validarNome(e.target, 'nomePai');
    });
    
    nomeMae.addEventListener('input', function(e) {
        validarNome(e.target, 'nomeMae');
    });
    
    endereco.addEventListener('input', function(e) {
        validarCampoTexto(e.target, 'endereco');
    });
    
    numero.addEventListener('input', function(e) {
        validarCampoTexto(e.target, 'numero');
    });
    
    cidade.addEventListener('input', function(e) {
        validarCampoTexto(e.target, 'cidade');
    });
    
    estado.addEventListener('change', function(e) {
        validarSelect(e.target, 'estado');
    });
    
    email.addEventListener('input', function(e) {
        validarEmail(e.target);
    });
    
    senha.addEventListener('input', function(e) {
        validarSenha(e.target);
        if (confirmarSenha.value) {
            validarConfirmacaoSenha(confirmarSenha);
        }
    });
    
    confirmarSenha.addEventListener('input', function(e) {
        validarConfirmacaoSenha(e.target);
    });
    
    // Adicionar animação ao botão submit
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('mouseenter', function() {
        this.querySelector('i').classList.add('fa-spin');
        setTimeout(() => {
            this.querySelector('i').classList.remove('fa-spin');
        }, 500);
    });
    
    // Resetar o formulário quando o botão de limpar for clicado
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', function() {
        // Limpar classes de validação
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.classList.remove('valido', 'invalido');
        });
        
        // Limpar mensagens de erro
        const errors = form.querySelectorAll('.error-message');
        errors.forEach(error => {
            error.textContent = '';
        });
        
        // Resetar força da senha
        senhaStrength.className = 'password-strength';
        senhaStrengthText.textContent = 'Força da senha';
        senhaStrengthText.style.opacity = '0';
        
        // Esconder seção de menor idade
        secaoMenorIdade.style.display = 'none';
        
        // Mostrar toast
        mostrarToast('info', 'Formulário limpo com sucesso!', 3000);
    });
    
    // Envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos os campos antes de enviar
        const validNomeCompleto = validarNomeCompleto(nomeCompleto);
        const validDataNascimento = validarDataNascimento(dataNascimento);
        const validCPF = validarCPF(cpf);
        const validTelefoneFixo = validarTelefoneFixo(telefoneFixo);
        const validCelular = validarCelular(celular);
        const validCEP = validarCEP(cep);
        const validEndereco = validarCampoTexto(endereco, 'endereco');
        const validNumero = validarCampoTexto(numero, 'numero');
        const validCidade = validarCampoTexto(cidade, 'cidade');
        const validEstado = validarSelect(estado, 'estado');
        const validEmail = validarEmail(email);
        const validSenha = validarSenha(senha);
        const validConfirmarSenha = validarConfirmacaoSenha(confirmarSenha);
        
        // Verificar se o usuário é menor de idade
        const idade = calcularIdade(dataNascimento.value);
        let validNomePai = true;
        let validNomeMae = true;
        
        if (idade < 18) {
            validNomePai = validarNome(nomePai, 'nomePai');
            validNomeMae = validarNome(nomeMae, 'nomeMae');
        }
        
        // Verificar se todos os campos obrigatórios são válidos
        if (validNomeCompleto && validDataNascimento && validCPF && 
            validCelular && validCEP && validEndereco && validNumero && 
            validCidade && validEstado && validEmail && validSenha && 
            validConfirmarSenha && validNomePai && validNomeMae) {
            
            // Exibir modal de sucesso em vez de alert
            successModal.classList.add('show');
            
            // Também exibir um toast de sucesso
            mostrarToast('success', 'Formulário enviado com sucesso!');
            
            // Limpar formulário após submissão bem-sucedida
            setTimeout(() => {
                form.reset();
                // Resetar classes e mensagens de erro
                const inputs = form.querySelectorAll('input, select');
                inputs.forEach(input => {
                    input.classList.remove('valido', 'invalido');
                });
                
                // Limpar mensagens de erro
                const errors = form.querySelectorAll('.error-message');
                errors.forEach(error => {
                    error.textContent = '';
                });
                
                // Resetar força da senha
                senhaStrength.className = 'password-strength';
                senhaStrengthText.textContent = 'Força da senha';
                senhaStrengthText.style.opacity = '0';
                
                // Esconder seção de menor idade
                secaoMenorIdade.style.display = 'none';
            }, 2000);
        } else {
            // Mostrar erro via toast em vez de alert
            mostrarToast('error', 'Por favor, corrija os erros no formulário antes de enviar.');
            
            // Rolar para o primeiro campo inválido
            const primeiroInvalido = form.querySelector('.invalido');
            if (primeiroInvalido) {
                primeiroInvalido.focus();
                primeiroInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Função para consultar o CEP na API ViaCEP
    function consultarCEP(cepValue) {
        // Indicar ao usuário que estamos buscando o CEP
        endereco.value = 'Buscando...';
        cidade.value = '';
        estado.value = '';
        
        // Limpar erros de CEP durante a busca
        limparErro(cep, 'cep');
        
        // Adicionar classe de carregamento
        cep.classList.add('carregando');
        
        fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na consulta do CEP');
                }
                return response.json();
            })
            .then(data => {
                // Remover classe de carregamento
                cep.classList.remove('carregando');
                
                if (data.erro) {
                    // CEP não encontrado
                    mostrarErro(cep, 'cep', 'CEP não encontrado');
                    endereco.value = '';
                    mostrarToast('warning', 'CEP não encontrado. Verifique o número digitado.', 4000);
                    return;
                }
                
                // Preencher os campos com os dados retornados
                endereco.value = data.logradouro;
                cidade.value = data.localidade;
                estado.value = data.uf;
                
                // Validar os campos preenchidos
                if (endereco.value) validarCampoTexto(endereco, 'endereco');
                if (cidade.value) validarCampoTexto(cidade, 'cidade');
                if (estado.value) validarSelect(estado, 'estado');
                
                // Mostrar toast de sucesso
                mostrarToast('success', 'Endereço preenchido automaticamente!', 3000);
                
                // Focar no campo número após preencher os dados
                numero.focus();
            })
            .catch(error => {
                console.error('Erro ao consultar o CEP:', error);
                mostrarErro(cep, 'cep', 'Erro na consulta do CEP');
                endereco.value = '';
                cidade.value = '';
                estado.value = '';
                
                // Mostrar toast de erro
                mostrarToast('error', 'Erro ao consultar o CEP. Tente novamente mais tarde.', 4000);
                
                // Remover classe de carregamento
                cep.classList.remove('carregando');
            });
    }
    
    // Funções de validação
    function validarNomeCompleto(el) {
        const valor = el.value.trim();
        const palavras = valor.split(/\s+/);
        
        if (valor === '') {
            mostrarErro(el, 'nomeCompleto', 'Nome completo é obrigatório');
            return false;
        } else if (palavras.length < 2) {
            mostrarErro(el, 'nomeCompleto', 'Informe nome e sobrenome');
            return false;
        } else {
            limparErro(el, 'nomeCompleto');
            return true;
        }
    }
    
    function validarNome(el, campo) {
        const valor = el.value.trim();
        
        if (valor === '') {
            mostrarErro(el, campo, 'Este campo é obrigatório');
            return false;
        } else {
            limparErro(el, campo);
            return true;
        }
    }
    
    function validarDataNascimento(el) {
        const valor = el.value;
        
        if (!valor) {
            mostrarErro(el, 'dataNascimento', 'Data de nascimento é obrigatória');
            return false;
        }
        
        const data = new Date(valor);
        const hoje = new Date();
        
        if (isNaN(data.getTime()) || data > hoje) {
            mostrarErro(el, 'dataNascimento', 'Data de nascimento inválida');
            return false;
        } else {
            limparErro(el, 'dataNascimento');
            return true;
        }
    }
    
    function calcularIdade(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const m = hoje.getMonth() - nascimento.getMonth();
        
        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        
        return idade;
    }
    
    function verificarIdade(el) {
        if (!el.value) return;
        
        const idade = calcularIdade(el.value);
        
        if (idade < 18) {
            // Mostrar seção com animação
            secaoMenorIdade.style.display = 'block';
            secaoMenorIdade.style.opacity = '0';
            secaoMenorIdade.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                secaoMenorIdade.style.transition = 'opacity 0.5s, transform 0.5s';
                secaoMenorIdade.style.opacity = '1';
                secaoMenorIdade.style.transform = 'translateY(0)';
            }, 10);
            
            nomePai.required = true;
            nomeMae.required = true;
            
            // Mostrar toast informando que precisa dos dados dos pais
            mostrarToast('info', 'Como você é menor de idade, precisamos dos dados dos seus pais.', 5000);
        } else {
            // Esconder seção com animação
            if (secaoMenorIdade.style.display !== 'none') {
                secaoMenorIdade.style.opacity = '0';
                secaoMenorIdade.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    secaoMenorIdade.style.display = 'none';
                }, 500);
            }
            
            nomePai.required = false;
            nomeMae.required = false;
        }
    }
    
    function validarCPF(el) {
        const valor = el.value.replace(/\D/g, '');
        
        if (valor.length !== 11) {
            mostrarErro(el, 'cpf', 'CPF deve conter 11 dígitos');
            return false;
        }
        
        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(valor)) {
            mostrarErro(el, 'cpf', 'CPF inválido');
            return false;
        }
        
        // Validação dos dígitos verificadores
        let soma = 0;
        let resto;
        
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(valor.substring(i - 1, i)) * (11 - i);
        }
        
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(valor.substring(9, 10))) {
            mostrarErro(el, 'cpf', 'CPF inválido');
            return false;
        }
        
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(valor.substring(i - 1, i)) * (12 - i);
        }
        
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(valor.substring(10, 11))) {
            mostrarErro(el, 'cpf', 'CPF inválido');
            return false;
        }
        
        limparErro(el, 'cpf');
        return true;
    }
    
    function validarTelefoneFixo(el) {
        const valor = el.value.replace(/\D/g, '');
        
        if (valor.length !== 10) {
            mostrarErro(el, 'telefoneFixo', 'Telefone fixo deve conter 10 dígitos (incluindo DDD)');
            return false;
        } else {
            limparErro(el, 'telefoneFixo');
            return true;
        }
    }
    
    function validarCelular(el) {
        const valor = el.value.replace(/\D/g, '');
        
        if (valor.length !== 11) {
            mostrarErro(el, 'celular', 'Celular deve conter 11 dígitos (incluindo DDD)');
            return false;
        } else {
            limparErro(el, 'celular');
            return true;
        }
    }
    
    function validarCEP(el) {
        const valor = el.value.replace(/\D/g, '');
        
        if (valor.length !== 8) {
            mostrarErro(el, 'cep', 'CEP deve conter 8 dígitos');
            return false;
        } else {
            limparErro(el, 'cep');
            return true;
        }
    }
    
    function validarCampoTexto(el, campo) {
        const valor = el.value.trim();
        
        if (valor === '') {
            mostrarErro(el, campo, 'Este campo é obrigatório');
            return false;
        } else {
            limparErro(el, campo);
            return true;
        }
    }
    
    function validarSelect(el, campo) {
        const valor = el.value;
        
        if (valor === '') {
            mostrarErro(el, campo, 'Selecione uma opção');
            return false;
        } else {
            limparErro(el, campo);
            return true;
        }
    }
    
    function validarEmail(el) {
        const valor = el.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (valor === '') {
            mostrarErro(el, 'email', 'Email é obrigatório');
            return false;
        } else if (!regex.test(valor)) {
            mostrarErro(el, 'email', 'Email inválido');
            return false;
        } else {
            limparErro(el, 'email');
            return true;
        }
    }
    
    function validarSenha(el) {
        const valor = el.value;
        const regexMaiuscula = /[A-Z]/;
        const regexMinuscula = /[a-z]/;
        const regexNumero = /[0-9]/;
        const regexEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        let nivel = 0;
        
        if (valor.length < 8) {
            mostrarErro(el, 'senha', 'A senha deve ter no mínimo 8 caracteres');
            senhaStrength.className = 'password-strength';
            senhaStrengthText.textContent = 'Força da senha';
            senhaStrengthText.style.opacity = '0';
            return false;
        } else {
            limparErro(el, 'senha');
            
            // Verificar nível de segurança
            if (regexMaiuscula.test(valor)) nivel++;
            if (regexMinuscula.test(valor)) nivel++;
            if (regexNumero.test(valor)) nivel++;
            if (regexEspecial.test(valor)) nivel++;
            
            if (nivel <= 2) {
                senhaStrength.className = 'password-strength fraca';
                senhaStrengthText.textContent = 'Senha fraca';
            } else if (nivel === 3) {
                senhaStrength.className = 'password-strength media';
                senhaStrengthText.textContent = 'Senha média';
            } else {
                senhaStrength.className = 'password-strength forte';
                senhaStrengthText.textContent = 'Senha forte';
            }
            
            return true;
        }
    }
    
    function validarConfirmacaoSenha(el) {
        const valorSenha = senha.value;
        const valorConfirmacao = el.value;
        
        if (valorConfirmacao === '') {
            mostrarErro(el, 'confirmarSenha', 'Confirme sua senha');
            return false;
        } else if (valorConfirmacao !== valorSenha) {
            mostrarErro(el, 'confirmarSenha', 'As senhas não coincidem');
            return false;
        } else {
            limparErro(el, 'confirmarSenha');
            return true;
        }
    }
    
    // Funções auxiliares
    function mostrarErro(el, campo, mensagem) {
        el.classList.add('invalido');
        el.classList.remove('valido');
        errorMessages[campo].textContent = mensagem;
    }
    
    function limparErro(el, campo) {
        el.classList.remove('invalido');
        el.classList.add('valido');
        errorMessages[campo].textContent = '';
    }
}); 