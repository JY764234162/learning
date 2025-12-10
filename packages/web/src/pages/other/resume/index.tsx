import React from "react";
import styles from "./index.module.less";
import avatar from "./avatar.jpg";
export const Component = () => {
  return (
    <div className={styles.resumeContainer}>
      {/* 第一页 */}
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>张三</h1>
          <div className={styles.contactInfo}>
            <p>高级前端开发工程师</p>
            <p>电话：138xxxxxxxx | 邮箱：zhangsan@email.com</p>
            <p>GitHub：github.com/zhangsan | 博客：blog.zhangsan.com</p>
          </div>
          <div className={styles.avatar}>
            <img src={avatar}></img>
          </div>
        </header>

        <section className={styles.section}>
          <h2>个人优势</h2>
          <div className={styles.advantageList}>
            {[
              {
                title: "全栈开发能力",
                detail: "有从0-1搭建到开发完整项目经验，能独立负责整个前端项目",
                icon: "🚀",
              },
              {
                title: "工程化专家",
                detail:
                  "熟悉前端工程化，阅读过vite源码，深入理解vite构建原理，能够独立开发基于公司业务的脚手架",
                icon: "⚙️",
              },
              {
                title: "sdk开发经验",
                detail:
                  "有sdk开发经验，熟悉sdk开发流程，能够独立开发sdk，并发布到npm包",
                icon: "🛠️",
              },
              {
                title: "技术栈扎实",
                detail: "精通React、Vue及其生态，熟悉TypeScript",
                icon: "💻",
              },
              {
                title: "规范化经验",
                detail:
                  "有前端规范化经验，能够统一前端代码规范、git commit 规范",
                icon: "📋",
              },
              {
                title: "部署运维",
                detail: "熟悉前端自动化部署流程，熟悉容器化部署",
                icon: "🔄",
              },
            ].map((item) => (
              <div key={item.title} className={styles.advantageItem}>
                <span className={styles.advantageIcon}>{item.icon}</span>
                <div className={styles.advantageContent}>
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>技术栈</h2>
          <div className={styles.skillTags}>
            {[
              { name: "React", level: "expert" },
              { name: "Vue", level: "expert" },
              { name: "TypeScript", level: "expert" },
              { name: "Webpack", level: "proficient" },
              { name: "Vite", level: "proficient" },
              { name: "Node.js", level: "proficient" },
              { name: "JavaScript", level: "expert" },
              { name: "HTML5", level: "expert" },
              { name: "CSS3", level: "expert" },
              { name: "Jest", level: "skilled" },
              { name: "Git", level: "expert" },
              { name: "Docker", level: "skilled" },
              { name: "RESTful API", level: "proficient" },
            ].map((skill) => (
              <span
                key={skill.name}
                className={`${styles.tag} ${styles[skill.level]}`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* 第二页 */}
      <div className={styles.page}>
        <section className={styles.section}>
          <h2>工作经历</h2>
          <div className={styles.experience}>
            <div className={styles.company}>
              <h3>XX科技有限公司（2020-至今）</h3>
              <p className={styles.title}>高级前端开发工程师</p>
              <ul>
                <li>负责公司核心产品的前端架构设计和开发</li>
                <li>带领5人团队完成多个重要项目</li>
                <li>推动前端工程化建设，提升开发效率30%</li>
              </ul>
            </div>
            <div className={styles.company}>
              <h3>YY科技有限公司（2018-2020）</h3>
              <p className={styles.title}>前端开发工程师</p>
              <ul>
                <li>参与电商平台的开发和维护</li>
                <li>负责性能优化，使页面加载速度提升50%</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>项目经历</h2>
          <div className={styles.projects}>
            <div className={styles.project}>
              <div className={styles.projectHeader}>
                <h3>企业级中台项目</h3>
                <span className={styles.duration}>2021.06 - 2022.12</span>
              </div>
              <div className={styles.projectContent}>
                <div className={styles.projectOverview}>
                  <span className={styles.projectIcon}>🏢</span>
                  <p className={styles.description}>
                    基于 React + TypeScript
                    的大型中台项目，服务于集团内部多个业务线
                  </p>
                </div>

                <div className={styles.projectDetails}>
                  <div className={styles.detailSection}>
                    <h4>
                      <span className={styles.detailIcon}>👨‍💻</span>
                      主要职责
                    </h4>
                    <ul>
                      <li>负责项目整体技术方案设计和架构搭建</li>
                      <li>设计并实现微前端架构，解决多团队协作问题</li>
                      <li>实现权限管理系统，支持灵活的权限控制</li>
                    </ul>
                  </div>

                  <div className={styles.detailSection}>
                    <h4>
                      <span className={styles.detailIcon}>✨</span>
                      技术亮点
                    </h4>
                    <ul>
                      <li>使用 qiankun 实现微前端架构</li>
                      <li>实现了高性能的数据状态管理方案</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 第三页 */}
      <div className={styles.page}>
        <section className={styles.section}>
          <h2>开源贡献</h2>
          <div className={styles.openSource}>
            <div className={styles.project}>
              <h3>React组件库</h3>
              <p>GitHub Stars: 1.2k</p>
              <p>一个高性能的 React UI 组件库，提供 50+ 个常用组件</p>
            </div>
            <div className={styles.project}>
              <h3>前端工程化工具</h3>
              <p>GitHub Stars: 800+</p>
              <p>提供项目模板、构建优化、代码规范等功能</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>教育背景</h2>
          <div className={styles.education}>
            <h3>XX大学</h3>
            <p>计算机科学与技术 | 本科 | 2014-2018</p>
          </div>
        </section>
      </div>
    </div>
  );
};

