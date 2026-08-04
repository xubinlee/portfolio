(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initNeuralBackground() {
    var canvas = document.getElementById("neural-bg");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var particles = [];
    var mouseX = 0;
    var mouseY = 0;
    var particleCount = window.innerWidth < 768 ? 30 : 60;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }

    for (var i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      if (prefersReducedMotion) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        var dx = mouseX - p.x;
        var dy = mouseY - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          p.x -= dx * 0.01;
          p.y -= dy * 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 255, 0.4)";
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var ddx = p.x - p2.x;
          var ddy = p.y - p2.y;
          var ddist = Math.sqrt(ddx * ddx + ddy * ddy);

          if (ddist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(0, 212, 255, " + (0.15 * (1 - ddist / 120)) + ")";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  function initCursorFollower() {
    if (prefersReducedMotion || window.innerWidth < 768) return;
    var cursor = document.getElementById("cursor-follower");
    if (!cursor) return;

    document.addEventListener("mousemove", function (e) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      if (!cursor.classList.contains("visible")) {
        cursor.classList.add("visible");
      }
    });

    document.addEventListener("mouseleave", function () {
      cursor.classList.remove("visible");
    });
  }

  function initNavigation() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("nav-menu");
    var links = document.querySelectorAll(".nav-link");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("open");
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("open");
      });
    });

    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("open");
      }
    });

    var sections = document.querySelectorAll(".section[id]");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            links.forEach(function (l) { l.classList.remove("active"); });
            var activeLink = document.querySelector('.nav-link[data-section="' + entry.target.id + '"]');
            if (activeLink) activeLink.classList.add("active");
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function initThemeToggle() {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;

    var savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }

    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("portfolio-theme", next);
      btn.setAttribute("aria-label", "切换主题：当前为" + (next === "dark" ? "暗色" : "亮色") + "模式");
  });

  window.addEventListener("storage", function (e) {
    if (e.key === "portfolio-theme" && e.newValue) {
      document.documentElement.setAttribute("data-theme", e.newValue);
      btn.setAttribute("aria-label", "切换主题：当前为" + (e.newValue === "dark" ? "暗色" : "亮色") + "模式");
    }
  });
}

  function initRoleRotation() {
    var roleEl = document.getElementById("hero-role");
    if (!roleEl) return;

    var roles = [
      "技术主管 / 架构负责人",
      "分布式微服务专家",
      "SaaS平台架构师",
      "AI多智能体工程师",
      "云原生技术实践者"
    ];
    var currentIndex = 0;

    setInterval(function () {
      currentIndex = (currentIndex + 1) % roles.length;
      if (prefersReducedMotion) {
        roleEl.textContent = roles[currentIndex];
      } else {
        roleEl.style.opacity = "0";
        roleEl.style.transform = "translateY(-10px)";
        setTimeout(function () {
          roleEl.textContent = roles[currentIndex];
          roleEl.style.opacity = "1";
          roleEl.style.transform = "translateY(0)";
        }, 300);
      }
    }, 3000);

    roleEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  }

  function initProjectFilters() {
    var buttons = document.querySelectorAll(".filter-btn");
    var cards = document.querySelectorAll(".project-card");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");

        buttons.forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");

        cards.forEach(function (card) {
          var category = card.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            card.classList.remove("hidden");
            card.setAttribute("aria-hidden", "false");
          } else {
            card.classList.add("hidden");
            card.setAttribute("aria-hidden", "true");
          }
        });
      });
    });
  }

  function initTimelineExpand() {
    var expandBtns = document.querySelectorAll(".timeline-expand");

    expandBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var detail = btn.nextElementSibling;
        var expanded = btn.getAttribute("aria-expanded") === "true";

        btn.setAttribute("aria-expanded", String(!expanded));

        if (expanded) {
          detail.hidden = true;
        } else {
          detail.hidden = false;
        }
      });
    });
  }

  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameInput = document.getElementById("contact-name");
      var emailInput = document.getElementById("contact-email");
      var messageInput = document.getElementById("contact-message");
      var nameError = document.getElementById("name-error");
      var emailError = document.getElementById("email-error");
      var messageError = document.getElementById("message-error");
      var successMsg = document.getElementById("form-success");

      var valid = true;

      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";

      if (!nameInput.value.trim()) {
        nameError.textContent = "请输入您的姓名";
        valid = false;
      }

      if (!emailInput.value.trim()) {
        emailError.textContent = "请输入您的邮箱";
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        emailError.textContent = "请输入有效的邮箱地址";
        valid = false;
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = "请输入您的消息";
        valid = false;
      }

      if (valid) {
        var name = nameInput.value.trim();
        var email = emailInput.value.trim();
        var message = messageInput.value.trim();

        var subject = "来自 " + name + " 的联系消息";
        var body = "姓名: " + name + "\n";
        body += "邮箱: " + email + "\n";
        body += "消息: " + message;

        var mailtoLink =
          "mailto:bin0754@163.com?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(body);

        window.location.href = mailtoLink;

        successMsg.hidden = false;
        form.reset();
        setTimeout(function () {
          successMsg.hidden = true;
        }, 5000);
      }
    });
  }

  function initAIChat() {
    var toggleBtn = document.querySelector(".ai-chat-toggle");
    var panel = document.getElementById("ai-chat-panel");
    var closeBtn = document.querySelector(".ai-chat-close");
    var inputForm = document.querySelector(".ai-chat-input");
    var inputField = document.getElementById("ai-input");
    var messagesContainer = document.querySelector(".ai-chat-messages");

    if (!toggleBtn || !panel) return;

    toggleBtn.addEventListener("click", function () {
      var expanded = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
      if (!expanded) {
        inputField.focus();
      }
    });

    closeBtn.addEventListener("click", function () {
      toggleBtn.setAttribute("aria-expanded", "false");
      panel.hidden = true;
      toggleBtn.focus();
    });

    var responses = {
      help: "可用命令：\n- about: 了解关于我\n- skills: 查看技能\n- projects: 查看项目\n- contact: 联系方式\n- 或者直接输入任何问题！",
      about: "我是LI XUBIN，拥有十多年软件工程开发、架构设计与团队管理经验。专注分布式微服务、云原生工程化、AI多智能体系统领域，持有3项国家发明专利与软件设计师中级资质。",
      skills: "核心技能：Java/Spring Cloud、分布式事务/Seata、SaaS多租户、MySQL/ES/Redis、Docker/K8s、CI/CD/GitOps、LLMOps/AgentScope、Spring AI/MCP协议。详见 Capability Graph 部分。",
      projects: "代表项目：智慧租住SaaS平台（IoT联动）、智能门锁保洁服务系统（发明专利）、微服务零停机发布系统（发明专利）、跨境电商平台（微服务重构）、AI智能体工程化框架（LLMOps）、微服务通用框架组件（Spring Cloud Alibaba）、企业级CI/CD流水线平台（Jenkins/K8s）。详见 Neural Outputs 部分。",
      contact: "邮箱：bin0754@163.com | 电话：159******** | 地址：广东深圳 | 也可以使用页面底部的联系表单。",
      default: "感谢您的消息！我是LI XUBIN的 AI 助手。输入 help 查看可用命令，或直接提问。"
    };

    inputForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = inputField.value.trim();
      if (!text) return;

      var userMsg = document.createElement("div");
      userMsg.className = "ai-message";
      userMsg.innerHTML = '<span class="ai-msg-prefix" aria-hidden="true">&gt; </span> ' + escapeHtml(text);
      messagesContainer.appendChild(userMsg);

      var lowerText = text.toLowerCase();
      var responseText = responses.default;
      Object.keys(responses).forEach(function (key) {
        if (lowerText.indexOf(key) !== -1) {
          responseText = responses[key];
        }
      });

      setTimeout(function () {
        var aiMsg = document.createElement("div");
        aiMsg.className = "ai-message";
        aiMsg.innerHTML = '<span class="ai-msg-prefix" aria-hidden="true">&gt; </span> ' + escapeHtml(responseText).replace(/\n/g, "<br>");
        messagesContainer.appendChild(aiMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 600);

      inputField.value = "";
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function initAIStatus() {
    var statusEl = document.getElementById("ai-status");
    if (!statusEl) return;

    var messages = [
      "neural sync: 98.7%",
      "正在分析访问者模式...",
      "认知负载: 最优状态",
      "等待解码您的请求...",
      "神经网络通路: 已激活",
      "系统完整性: 100%"
    ];

    var index = 0;

    setInterval(function () {
      index = (index + 1) % messages.length;
      statusEl.querySelector(".ai-status-text").textContent = messages[index];
    }, 5000);
  }

  function initScrollReveal() {
    if (prefersReducedMotion) return;

    var sections = document.querySelectorAll(".about-section, .projects-section, .skills-section, .experience-section, .contact-section");

    sections.forEach(function (section) {
      section.classList.add("reveal-on-scroll");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function initMeterAnimations() {
    var meterFills = document.querySelectorAll(".meter-fill");
    var skillFills = document.querySelectorAll(".skill-fill");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    meterFills.forEach(function (fill) { observer.observe(fill); });
    skillFills.forEach(function (fill) { observer.observe(fill); });
  }

  function initSkillsRadar() {
    var canvas = document.getElementById("skills-canvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    var size = 500;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    ctx.scale(dpr, dpr);

    var centerX = size / 2;
    var centerY = size / 2;
    var maxRadius = 180;

    var labels = ["分布式架构", "数据&中间件", "AI&LLMOps", "DevOps", "团队管理", "项目管理"];
    var values = [0.93, 0.88, 0.82, 0.90, 0.88, 0.92];
    var sides = labels.length;

    function getPoint(index, radius) {
      var angle = (Math.PI * 2 * index) / sides - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    }

    function drawRadar(progress) {
      ctx.clearRect(0, 0, size, size);

      for (var ring = 1; ring <= 4; ring++) {
        var r = (maxRadius * ring) / 4;
        ctx.beginPath();
        for (var i = 0; i <= sides; i++) {
          var p = getPoint(i % sides, r);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(0, 212, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (var i = 0; i < sides; i++) {
        var p = getPoint(i, maxRadius);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = "rgba(0, 212, 255, 0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      for (var i = 0; i <= sides; i++) {
        var idx = i % sides;
        var r = maxRadius * values[idx] * progress;
        var p = getPoint(idx, r);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(0, 212, 255, 0.12)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 212, 255, 0.7)";
      ctx.lineWidth = 2;
      ctx.stroke();

      for (var i = 0; i < sides; i++) {
        var r = maxRadius * values[i] * progress;
        var p = getPoint(i, r);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 255, 0.9)";
        ctx.fill();
      }

      for (var i = 0; i < sides; i++) {
        var p = getPoint(i, maxRadius + 25);
        ctx.font = "12px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(160, 160, 184, 0.8)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(labels[i], p.x, p.y);
      }
    }

    var animated = false;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !animated) {
            animated = true;
            var progress = 0;
            function animateRadar() {
              progress += 0.02;
              if (progress > 1) progress = 1;
              drawRadar(progress);
              if (progress < 1) requestAnimationFrame(animateRadar);
            }
            if (prefersReducedMotion) {
              drawRadar(1);
            } else {
              animateRadar();
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(canvas);
  }

  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var lastScroll = 0;

    window.addEventListener("scroll", function () {
      var currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
      } else {
        header.style.boxShadow = "none";
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  function initProjectModal() {
    document.querySelectorAll('.project-card').forEach(function(card) {
      card.addEventListener('click', function(e) {
        if (e.target.closest('.card-link')) return;

        var projectUrl = card.getAttribute('data-project-url');
        if (projectUrl) {
          window.location.href = projectUrl;
        }
      });

      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');

      var titleEl = card.querySelector('.card-title');
      if (titleEl) {
        var titleText = titleEl.textContent;
        card.setAttribute('aria-label', '查看项目详情：' + titleText);
      }

      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var url = card.getAttribute('data-project-url');
          if (url) {
            window.location.href = url;
          }
        }
      });
    });
  }

  function init() {
    initNeuralBackground();
    initCursorFollower();
    initNavigation();
    initThemeToggle();
    initRoleRotation();
    initProjectFilters();
    initTimelineExpand();
    initContactForm();
    initAIChat();
    initAIStatus();
    initScrollReveal();
    initMeterAnimations();
    initSkillsRadar();
    initHeaderScroll();
    initProjectModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();