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
  
  document.addEventListener('DOMContentLoaded', () => {
            const showStatsButton = document.getElementById('show-stats');
            const statsModal = document.getElementById('stats-modal');
            const closeModalButton = document.getElementById('close-modal');
            const currentTimeElement = document.getElementById('current-time');
            const totalTimeElement = document.getElementById('total-time');
            const daySummaries = document.getElementById('day-summaries');

            showStatsButton.addEventListener('click', () => {
                statsModal.classList.add('show');
            });

            closeModalButton.addEventListener('click', () => {
                statsModal.classList.remove('show');
            });

            function getVisitData() {
                const visits = JSON.parse(localStorage.getItem('visits') || '[]');
                return visits.map(visit => ({
                    ...visit,
                    start: new Date(visit.start),
                    end: visit.end ? new Date(visit.end) : null
                }));
            }

            function saveVisitData(visits) {
                localStorage.setItem('visits', JSON.stringify(visits));
            }

            function formatDuration(seconds) {
                const days = Math.floor(seconds / 86400);
                const hours = Math.floor((seconds % 86400) / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const secs = seconds % 60;
                return `${days > 0 ? days + 'd ' : ''}${hours > 0 ? hours + 'h ' : ''}${minutes}m ${secs}s`;
            }

            function updateTotalTime(visits) {
                setInterval(() => {
                    const now = Date.now();
                    const lastVisit = visits[visits.length - 1];
                    if (lastVisit && !lastVisit.end) {
                        lastVisit.duration = Math.floor((now - lastVisit.start) / 1000);
                    }
                    const totalDuration = visits.reduce((total, visit) => total + (visit.duration || 0), 0);
                    totalTimeElement.textContent = formatDuration(totalDuration);
                }, 1000);
            }

            function addDaySummary(day, visits, totalDuration, isCurrentDay) {
                const summary = document.createElement('div');
                summary.className = 'stats-container';
                summary.innerHTML = `<div class="stats-header">${day}</div>
                                     <div class="stats-item">Visitas: ${visits}</div>
                                     <div class="stats-item" id="day-${day.replace(/\//g, '-')}">Tempo total: ${formatDuration(totalDuration)}</div>`;
                daySummaries.appendChild(summary);

                if (isCurrentDay) {
                    setInterval(() => {
                        const visits = getVisitData();
                        const visitsToday = visits.filter(visit => visit.start.toLocaleDateString() === day);
                        const totalDurationToday = visitsToday.reduce((total, visit) => total + (visit.duration || 0), 0);
                        document.getElementById(`day-${day.replace(/\//g, '-')}`).textContent = `Tempo total: ${formatDuration(totalDurationToday)}`;
                    }, 1000);
                }
            }

            function groupVisitsByDay(visits) {
                const visitsByDay = {};
                visits.forEach(visit => {
                    const day = visit.start.toLocaleDateString();
                    if (!visitsByDay[day]) {
                        visitsByDay[day] = { visits: 0, totalDuration: 0 };
                    }
                    visitsByDay[day].visits += 1;
                    visitsByDay[day].totalDuration += visit.duration || 0;
                });
                return visitsByDay;
            }

            function updateStats() {
                const visits = getVisitData();
                daySummaries.innerHTML = '';
                const visitsByDay = groupVisitsByDay(visits);
                for (const [day, data] of Object.entries(visitsByDay)) {
                    addDaySummary(day, data.visits, data.totalDuration, day === new Date().toLocaleDateString());
                }
                updateTotalTime(visits);
            }

            function startTimer() {
                let startTime = Date.now();
                setInterval(() => {
                    const currentDuration = Math.floor((Date.now() - startTime) / 1000);
                    currentTimeElement.textContent = formatDuration(currentDuration);
                    saveCurrentVisitDuration(currentDuration);
                }, 1000);
            }

            function saveCurrentVisitDuration(duration) {
                const visits = getVisitData();
                if (visits.length > 0) {
                    const lastVisit = visits[visits.length - 1];
                    if (lastVisit.end === null) {
                        lastVisit.duration = duration;
                        saveVisitData(visits);
                    }
                }
            }

            function startNewVisit() {
                const visits = getVisitData();
                visits.push({
                    start: Date.now(),
                    end: null,
                    duration: 0
                });
                saveVisitData(visits);
                startTimer();
                updateStats();
            }

            function handleVisibilityChange() {
                if (document.visibilityState === 'hidden') {
                    const visits = getVisitData();
                    const lastVisit = visits[visits.length - 1];
                    if (lastVisit && !lastVisit.end) {
                        lastVisit.end = Date.now();
                        lastVisit.duration = Math.floor((lastVisit.end - lastVisit.start) / 1000);
                        saveVisitData(visits);
                    }
                } else if (document.visibilityState === 'visible') {
                    startNewVisit();
                }
            }

            window.addEventListener('beforeunload', handleVisibilityChange);
            document.addEventListener('visibilitychange', handleVisibilityChange);

            // Iniciar nova visita ao carregar a página
            startNewVisit();
        });
  
  