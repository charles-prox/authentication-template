import React, { useMemo } from "react";
import { usePage, useForm } from "@inertiajs/react";
import { asset } from "@/utils/helpers";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    User,
    Image,
    Button,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Navbar,
    Spacer,
    Divider,
} from "@nextui-org/react";
import { useTheme } from "@/ThemeProvider";
import {
    BellIcon,
    CaretDownIcon,
    LogoutIcon,
    MoonIcon,
    SunIcon,
    UserIcon,
    UserIdIcon,
} from "./icons";
import { appName } from "@/utils/constants";

const Logo = () => {
    return useMemo(
        () => (
            <Image
                width={45}
                alt="App logo"
                src={"logo.png"}
                // src={asset("charles-logo.png")}
                loading="lazy"
                removeWrapper
            />
        ),
        []
    );
};

const ThemeToggleIcon = () => {
    const theme = useTheme().theme;

    return useMemo(
        () => (theme === "light" ? <MoonIcon /> : <SunIcon />),
        [theme]
    );
};

const AppNavbar = () => {
    const { auth } = usePage().props;
    const { post } = useForm();
    const { theme, toggleTheme } = useTheme();

    const submit = (e) => {
        e.preventDefault();
        post(route("logout"), { replace: true });
    };

    return useMemo(
        () => (
            <Navbar
                maxWidth={"full"}
                classNames={{
                    wrapper: `px-6 ${
                        theme === "light" && "bg-custom-gradient"
                    }`,
                }}
            >
                <NavbarBrand>
                    {/* Change this section into your logo */}
                    <Logo />
                    <Spacer x="2" />
                    <div className="hidden sm:flex text-xl font-bold ">
                        {appName}
                    </div>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        onClick={() => toggleTheme()}
                    >
                        <ThemeToggleIcon />
                    </Button>
                    <Divider orientation="vertical" className={"h-5"} />
                    {auth.user && (
                        <NavbarItem>
                            <Dropdown showArrow>
                                <DropdownTrigger>
                                    <Button
                                        disableAnimation
                                        className="inline-flex items-center rounded-md bg-transparent"
                                    >
                                        <User
                                            name={auth?.user?.name}
                                            description={auth?.user?.position}
                                            avatarProps={{
                                                showFallback: true,
                                                src:
                                                    "https://i.pravatar.cc/150?u=a04258114e29026702d" ||
                                                    asset("avatar1.jpg"),
                                                fallback: <UserIcon />,
                                            }}
                                        />
                                        <CaretDownIcon />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Static Actions"
                                    classNames={{ list: "text-foreground" }}
                                >
                                    <DropdownItem
                                        key="profile"
                                        // href={route("profile.edit")}
                                        startContent={<UserIdIcon />}
                                        description="Update personal information and photo"
                                    >
                                        Profile
                                    </DropdownItem>
                                    <DropdownItem
                                        key="notification"
                                        // href={route("profile.edit")}
                                        startContent={<BellIcon />}
                                        description="Show reminders and updates"
                                        showDivider
                                    >
                                        Notifications
                                    </DropdownItem>
                                    <DropdownItem
                                        key="logout"
                                        onClick={(e) => submit(e)}
                                        startContent={<LogoutIcon />}
                                    >
                                        Log out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarItem>
                    )}
                </NavbarContent>
            </Navbar>
        ),
        [auth, toggleTheme, theme]
    );
};

export default AppNavbar;
