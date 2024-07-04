document.addEventListener('DOMContentLoaded', function() {
    // Esconde a tela de carregamento e exibe o conteúdo principal após 2 segundos
    setTimeout(() => {
        document.querySelector('.splash-screen').style.display = 'none';
        document.querySelector('.main-content').style.display = 'block';
    }, 0000);

    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const tabsContainer = document.getElementById('tabsContainer');

    // Alterna o menu de abas ao clicar no ícone de menu
    hamburgerMenu.addEventListener('click', function() {
        const isOpen = tabsContainer.style.transform === 'translateX(0%)';
        tabsContainer.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0%)';
        hamburgerMenu.classList.toggle('open', !isOpen);
    });

    // Fecha o menu de abas ao clicar fora dele
    document.addEventListener('click', function(event) {
        if (!tabsContainer.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            tabsContainer.style.transform = 'translateX(-100%)';
            hamburgerMenu.classList.remove('open');
        }
    });

    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Atualiza o estado das abas
            tabLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Transição para ocultar todas as abas
            tabContents.forEach(content => {
                content.classList.add('hidden');
                setTimeout(() => content.classList.remove('active'), 500);
            });

            // Mostra a aba selecionada com transição
            const tabContent = document.querySelector(this.getAttribute('href'));
            setTimeout(() => {
                tabContent.classList.add('active');
                tabContent.classList.remove('hidden');
            }, 500);

            // Adiciona estado ao histórico
            const tabId = this.getAttribute('href').substring(1);
            history.pushState({ tabId: tabId }, null, `#${tabId}`);

            // Fecha o menu de abas e redefine o ícone de menu
            tabsContainer.style.transform = 'translateX(-100%)';
            hamburgerMenu.classList.remove('open');
        });
    });

    // Manipula o botão de voltar do navegador
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.tabId) {
            const tabLink = document.querySelector(`a[href="#${event.state.tabId}"]`);
            if (tabLink) {
                tabLink.click();
            }
        }
    });

    // Seleciona automaticamente a primeira aba ou a aba do hash da URL
    if (tabLinks.length > 0) {
        const initialTab = window.location.hash ? window.location.hash.substring(1) : tabLinks[0].getAttribute('href').substring(1);
        const initialTabLink = document.querySelector(`a[href="#${initialTab}"]`);
        if (initialTabLink) {
            initialTabLink.click();
        } else {
            tabLinks[0].click();
        }
    }
});

var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.classList.remove("show");
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.classList.add("show");
        }
    });
}

function goToTab(tabId) {
    const targetTab = document.querySelector(`#${tabId}`);
    targetTab.scrollIntoView({ behavior: 'smooth' });
}

function toggleMenu() {
    var menu = document.getElementById('menuItems');
    menu.style.display = (menu.style.display === 'block' ? 'none' : 'block');
}

function toggleTransitions() {
    var body = document.body;
    if (body.classList.contains('no-transitions')) {
        body.classList.remove('no-transitions');
        localStorage.setItem('transitionsDisabled', 'false');
    } else {
        body.classList.add('no-transitions');
        localStorage.setItem('transitionsDisabled', 'true');
    }
    updateToggleText();
}

function updateToggleText() {
    var toggleText = document.querySelector('li[onclick="toggleTransitions()"]');
    if (localStorage.getItem('transitionsDisabled') === 'true') {
        toggleText.textContent = 'Ativar transições';
    } else {
        toggleText.textContent = 'Desativar transições';
    }
}

// Fechar o menu ao clicar em qualquer parte da tela
document.addEventListener('click', function(event) {
    var menu = document.getElementById('menuItems');
    if (event.target.closest('.menu') === null && menu.style.display === 'block') {
        menu.style.display = 'none';
    }
});


// Função para carregar anotações salvas
window.onload = function() {
    var notasSalvas = localStorage.getItem('anotacoes');
    if (notasSalvas) {
        document.getElementById('notepad').value = notasSalvas;
    }
}

// Função para salvar anotações
function salvarAnotacoes() {
    var anotacoes = document.getElementById('notepad').value;
    localStorage.setItem('anotacoes', anotacoes);
    exibirMensagem('saveMessage');
}

// Função para limpar anotações
function limparAnotacoes() {
    localStorage.removeItem('anotacoes');
    document.getElementById('notepad').value = '';
    exibirMensagem('clearMessage');
}

function checkVersions() {
    // Redirecionar para o link de verificar versões
    window.location.href = 'https://www.mediafire.com/folder/qpuyyl1xwj56m/Revisao';
}
  function novoLink() {
    // Redirecionar para o novo link desejado
    window.location.href = 'https://wa.me/?text=Instale%20o%20aplicativo%20Revisão%20para%20não%20perder%20a%20matéria:%20https%3A%2F%2Fwww.mediafire.com%2Ffolder%2Fqpuyyl1xwj56m%2FRevisao';
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('Service Worker registrado com sucesso:', registration);
        }, function(error) {
            console.log('Falha ao registrar o Service Worker:', error);
        });

        navigator.serviceWorker.addEventListener('message', function(event) {
            if (event.data === 'cached') {
                document.getElementById('message').textContent = 'O conteúdo foi salvo no cache!';
            }
        });
    });
}

      function startCountdown(elementId, endDate) {
            function updateCountdown() {
                const now = new Date().getTime();
                const distance = endDate - now;

                if (distance < 0) {
                    document.getElementById(elementId).innerHTML = "A Prova Já foi Iniciada";
                    clearInterval(interval);
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById(elementId).innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }

            updateCountdown();
            const interval = setInterval(updateCountdown, 1000);
        }

        const event1Date = new Date("2024-07-10T10:10:00").getTime();
        const event2Date = new Date("2024-11-01T00:00:00").getTime();
        const event3Date = new Date("2024-08-15T00:00:00").getTime();

        startCountdown("countdown1", event1Date);
        startCountdown("countdown2", event2Date);
        startCountdown("countdown3", event3Date);
  
  