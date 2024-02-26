import { useState, useEffect, ReactNode, MouseEventHandler } from "react";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import Home from "./panels/Home";
import TaskDetails from "./panels/TaskDetails";
import { setUserVK } from "./store/user";
import { setUserServerFx } from "./api/user";

const App = () => {
  const [activePanel, setActivePanel] = useState("home");
  const [popout, setPopout] = useState<ReactNode | null>(
    <ScreenSpinner size="large" />
  );

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUserVK(user);
      setUserServerFx(user.id);
      setPopout(null);
    }
    fetchData();
  }, []);

  const go: MouseEventHandler<HTMLElement> = (e) => {
    setActivePanel(e.currentTarget.dataset.to ?? "home");
  };

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id="home" go={go} />
                <TaskDetails id="taskdetails" go={go} />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
