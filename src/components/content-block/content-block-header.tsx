import {
  Button,
  Card,
  Dialog,
  Flex,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { EllipsisIcon } from "lucide-react";
import React, { useState } from "react";

export interface ContentBlockHeaderAction {
  title: string;
  color?: string;
  onClick: () => Promise<void>;
}

interface ContentBlockHeaderOptions {
  edit?: () => Promise<void>;
  versions?: () => Promise<void>;
  delete?: () => Promise<void>;
  actions?: ContentBlockHeaderAction[];
}

interface ContentBlockHeaderProps extends React.PropsWithChildren {
  title: string;
  options?: ContentBlockHeaderOptions;
}

const DeleteDialog: React.FC<{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  onCancel: () => void;
}> = ({ isOpen, onOpenChange, onDelete, onCancel }) => (
  <Dialog.Root
    open={isOpen}
    onOpenChange={(details) => onOpenChange(details.open)}
  >
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Confirm Delete</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <Text>
            Are you sure you want to delete? This action can't be undone.
          </Text>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </Dialog.Footer>
        <Dialog.CloseTrigger />
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
);

export const ContentBlockHeader: React.FC<ContentBlockHeaderProps> = ({
  title,
  options,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    options?.delete?.();
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card.Header px={6} pb={0}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text p="1" variant="h6">
            {title}
          </Text>
          <Flex alignItems="center">
            {options && (
              <Menu.Root>
                <Menu.Trigger aria-label="Options">
                  <EllipsisIcon size={16} cursor="pointer" />
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      {options.edit && (
                        <Menu.Item
                          cursor="pointer"
                          value="edit"
                          onClick={options.edit}
                        >
                          Edit
                        </Menu.Item>
                      )}
                      {options.versions && (
                        <Menu.Item
                          cursor="pointer"
                          value="versions"
                          onClick={options.versions}
                        >
                          Versions
                        </Menu.Item>
                      )}
                      {options.delete && (
                        <Menu.Item
                          cursor="pointer"
                          value="delete"
                          onClick={handleDeleteClick}
                        >
                          <Text color="red">Delete</Text>
                        </Menu.Item>
                      )}
                      {options.actions?.map((action) => (
                        <Menu.Item
                          cursor="pointer"
                          value={action.title}
                          onClick={action.onClick}
                        >
                          <Text color={action.color}>{action.title}</Text>
                        </Menu.Item>
                      ))}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            )}
          </Flex>
        </Flex>
      </Card.Header>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
};
