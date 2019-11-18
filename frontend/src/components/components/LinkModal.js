import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import CopyIcon from '@material-ui/icons/FilterNone';
import Container from '@material-ui/core/Container';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';

const LinkModal = ({ open, link, onClose, anchorEl }) => {
  const [toolTipOpen, setToolTipOpen] = React.useState(false);

  const copyLink = async () => {
    setToolTipOpen(true);
    navigator.clipboard.writeText(link);

    setTimeout(() => setToolTipOpen(false), 1000);
  };

  const handleClose = (event) => {
    setToolTipOpen(false);
    onClose(event);
  };

  return (
    <Popover open={open} onClose={handleClose} anchorEl={anchorEl}>
      <Container style={{ padding: '5px' }}>
        <span style={{ marginRight: '10px', marginLeft: '10px' }}>{link}</span>
        <Tooltip
          open={toolTipOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="Link Copied"
        >
          <Button onClick={copyLink}>
            <CopyIcon />
            Copy Link
          </Button>
        </Tooltip>
        <Button onClick={handleClose}>
          <CancelIcon />
        </Button>
      </Container>
    </Popover>
  );
};

LinkModal.defaultProps = {
  anchorEl: <></>,
};

LinkModal.propTypes = {
  open: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.object.isRequired,
};

export default LinkModal;
