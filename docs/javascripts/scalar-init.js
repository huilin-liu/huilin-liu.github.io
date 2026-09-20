window.addEventListener("load", () => {
  const container = document.getElementById("scalar-api-reference");

  if (!container || !window.Scalar?.createApiReference) {
    return;
  }

  document.documentElement.classList.add("scalar-reference-page");

  const moveBacklink = () => {
    const backlink = document.querySelector(".reference-backlink");
    const links = container.querySelector(".section-header-wrapper > .custom-scroll");

    if (!backlink || !links || backlink.parentElement === links) {
      return Boolean(backlink && links);
    }

    const linkRow = document.createElement("div");
    linkRow.className = "reference-header-link-row";

    [...links.children].forEach((child) => {
      if (!child.classList.contains("reference-backlink")) {
        linkRow.appendChild(child);
      }
    });

    links.append(backlink, linkRow);
    links.classList.add("reference-header-links--stacked");
    return true;
  };

  const hideClientPicker = () => {
    let hidden = false;

    container.querySelectorAll("button").forEach((button) => {
      const label = `${button.getAttribute("aria-label") || ""} ${button.textContent || ""}`
        .replace(/\s+/g, " ")
        .trim();

      if (label.includes("Select from all clients")) {
        button.hidden = true;
        button.setAttribute("aria-hidden", "true");
        hidden = true;
      }
    });

    return hidden;
  };

  const hideClientLibrariesSection = () => {
    const labels = [...container.querySelectorAll("*")].filter(
      (element) => element.textContent?.trim() === "Client Libraries",
    );

    for (const label of labels) {
      let section = label.parentElement;

      while (section && section !== container) {
        const hasClientTabs = section.querySelector('[role="tablist"], [role="tab"]');
        const sectionText = section.textContent?.replace(/\s+/g, " ").trim() || "";

        if (hasClientTabs && sectionText.includes("Shell Curl")) {
          section.hidden = true;
          section.setAttribute("aria-hidden", "true");
          return true;
        }

        section = section.parentElement;
      }
    }

    return false;
  };

  const findFieldList = (heading) => {
    let scope = heading.parentElement;

    while (scope && scope !== container) {
      const list = scope.querySelector("ul, [role='list']");

      if (list) {
        return list;
      }

      scope = scope.parentElement;
    }

    return null;
  };

  const getFieldItems = (list) => [...list.querySelectorAll("li, [role='listitem']")];

  const getDirectDescriptionParagraphs = (item) =>
    [...item.querySelectorAll("p")].filter((paragraph) => {
      const owner = paragraph.closest("li, [role='listitem']");
      return !owner || owner === item;
    });

  const findNestedFieldToggle = (item) =>
    [...item.querySelectorAll("button[aria-expanded]")].find(
      (button) => !button.textContent?.trim(),
    );

  const styleChevronToggle = (toggle) => {
    toggle.classList.add("scalar-chevron-toggle");
    toggle.setAttribute("data-scalar-chevron", "true");
  };

  const getExtraDescriptionNodes = (item, paragraphs) => {
    const nodes = [...paragraphs.slice(1)];
    const firstParagraph = paragraphs[0];
    const parent = firstParagraph?.parentElement;

    if (parent) {
      const children = [...parent.children];
      const firstIndex = children.indexOf(firstParagraph);

      children.slice(firstIndex + 1).forEach((child) => {
        if (child.matches("p, ul, ol") && !child.querySelector("button[aria-expanded]")) {
          nodes.push(child);
        }
      });
    }

    return [...new Set(nodes)];
  };

  const bindDescriptionToggle = (toggle, paragraphs) => {
    const extraNodes = getExtraDescriptionNodes(toggle.closest("li, [role='listitem']"), paragraphs);

    if (!extraNodes.length) {
      styleChevronToggle(toggle);
      return;
    }

    extraNodes.forEach((node) => {
      node.classList.add("scalar-collapsible-description");
    });

    const syncDescription = () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";

      extraNodes.forEach((node) => {
        node.hidden = !expanded;
      });

      toggle.setAttribute("aria-label", expanded ? "Hide more details" : "Show more details");
    };

    if (!toggle.dataset.scalarDescriptionBound) {
      toggle.dataset.scalarDescriptionBound = "true";
      toggle.addEventListener("click", () => {
        if (!toggle.hasAttribute("aria-expanded")) {
          toggle.setAttribute("aria-expanded", "true");
        } else {
          toggle.setAttribute(
            "aria-expanded",
            toggle.getAttribute("aria-expanded") === "true" ? "false" : "true",
          );
        }

        syncDescription();
      });
    }

    styleChevronToggle(toggle);
    syncDescription();
  };

  const enhanceFieldItem = (item) => {
    if (item.dataset.scalarFieldEnhanced === "true") {
      return;
    }

    const paragraphs = getDirectDescriptionParagraphs(item);
    const nestedToggle = findNestedFieldToggle(item);

    if (nestedToggle) {
      bindDescriptionToggle(nestedToggle, paragraphs);
    } else if (paragraphs.length > 1) {
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "scalar-description-toggle";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Show more details");

      const propertyHeading = item.querySelector(".property-heading, .parameter-item-name");
      if (propertyHeading) {
        propertyHeading.prepend(toggle);
      } else {
        item.prepend(toggle);
      }

      bindDescriptionToggle(toggle, paragraphs);
    }

    item.dataset.scalarFieldEnhanced = "true";
  };

  const enhanceFieldSections = () => {
    const headings = [...container.querySelectorAll("h2, h3, h4")].filter((heading) =>
      ["Path Parameters", "Query Parameters", "Body"].includes(heading.textContent?.trim()),
    );

    headings.forEach((heading) => {
      const list = findFieldList(heading);

      if (!list) {
        return;
      }

      getFieldItems(list).forEach(enhanceFieldItem);
    });

    return headings.length > 0;
  };

  const styleResponseToggles = () => {
    const toggles = [
      ...container.querySelectorAll(
        ".responses-list--tree .parameter-item-trigger, button[data-schema-toggle][aria-expanded]",
      ),
    ];
    const managedToggles = new Set(toggles);

    container.querySelectorAll("button.scalar-chevron-toggle").forEach((button) => {
      if (!managedToggles.has(button) && !button.classList.contains("scalar-description-toggle")) {
        button.classList.remove("scalar-chevron-toggle");
        button.removeAttribute("data-scalar-chevron");
      }
    });

    toggles.forEach(styleChevronToggle);
    return toggles.length > 0;
  };

  window.Scalar.createApiReference("#scalar-api-reference", {
    url: "../../specs/airtable-openapi.yaml",
    theme: "kepler",
    showSidebar: true,
    showDeveloperTools: false,
    hideModels: true,
    hideClientButton: true,
    showOperationId: true,
    defaultHttpClient: {
      targetKey: "shell",
      clientKey: "curl",
    },
    hiddenClients: {
      c: true,
      clojure: true,
      csharp: true,
      dart: true,
      fsharp: true,
      go: true,
      http: true,
      java: true,
      js: true,
      julia: true,
      kotlin: true,
      node: true,
      objc: true,
      ocaml: true,
      php: true,
      powershell: true,
      python: true,
      r: true,
      ruby: true,
      rust: true,
      swift: true,
      shell: ["httpie", "wget"],
    },
    withDefaultFonts: true,
  });

  const applyScalarTweaks = () =>
    moveBacklink() &&
    hideClientPicker() &&
    hideClientLibrariesSection() &&
    enhanceFieldSections() &&
    styleResponseToggles();

  const observer = new MutationObserver(() => {
    applyScalarTweaks();
  });

  observer.observe(container, { childList: true, subtree: true });
  applyScalarTweaks();
});
